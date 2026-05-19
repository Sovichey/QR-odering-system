"use client";

import { useState, useEffect } from "react";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { CustomerMenuView } from "@/components/views/CustomerMenuView";
import { KitchenView } from "@/components/views/KitchenView";
import { AdminDashboard } from "@/components/views/AdminDashboard";
import { StaffLoginModal } from "@/components/staff/StaffLoginModal";
import { TableNumberInput } from "@/components/TableNumberInput";
import { ViewType } from "@/lib/types";

const TABLE_NUMBER_STORAGE_KEY = "restaurant_table_number";
const CART_STORAGE_KEY = "restaurant_cart";
const CURRENT_VIEW_STORAGE_KEY = "restaurant_current_view";

function StaffContent({
  currentView,
  onLogout,
}: {
  currentView: ViewType;
  onLogout: () => void;
}) {
  return (
    <RestaurantProvider initialTableNumber={0}>
      <>
        {currentView === "kitchen" && <KitchenView onLogout={onLogout} />}
        {currentView === "admin" && <AdminDashboard onLogout={onLogout} />}
      </>
    </RestaurantProvider>
  );
}

function CustomerContent({
  onChangeTable,
  currentView: initialView,
  onViewChange,
  onStaffLoginClick,
}: {
  onChangeTable: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onStaffLoginClick: () => void;
}) {
  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    onViewChange(view);
  };

  const handleStaffLogin = (role: "kitchen" | "admin") => {
    handleViewChange(role);
  };

  return (
    <>
      {currentView === "menu" && (
        <CustomerMenuView
          onStaffLogin={() => setLoginModalOpen(true)}
          onChangeTable={onChangeTable}
          staffLoginOpen={loginModalOpen}
        />
      )}

      <StaffLoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={handleStaffLogin}
      />
    </>
  );
}

export function RestaurantSystem() {
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>("menu");
  const [isHydrated, setIsHydrated] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Load table number and view from localStorage on mount
  useEffect(() => {
    const savedTableNumber = localStorage.getItem(TABLE_NUMBER_STORAGE_KEY);
    const savedView = localStorage.getItem(
      CURRENT_VIEW_STORAGE_KEY,
    ) as ViewType;

    if (savedTableNumber) {
      setTableNumber(parseInt(savedTableNumber, 10));
    }

    if (
      savedView &&
      (savedView === "menu" || savedView === "kitchen" || savedView === "admin")
    ) {
      setCurrentView(savedView);
    }

    setIsHydrated(true);
  }, []);

  const handleTableNumberSet = (num: number) => {
    setTableNumber(num);
    localStorage.setItem(TABLE_NUMBER_STORAGE_KEY, num.toString());
    setCurrentView("menu");
    localStorage.setItem(CURRENT_VIEW_STORAGE_KEY, "menu");
  };

  const handleStaffLogin = (role: "kitchen" | "admin") => {
    setCurrentView(role);
    localStorage.setItem(CURRENT_VIEW_STORAGE_KEY, role);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    // Go back to table input screen
    setTableNumber(null);
    setCurrentView("menu");
    localStorage.removeItem(TABLE_NUMBER_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CURRENT_VIEW_STORAGE_KEY);
  };

  const handleChangeTable = () => {
    setTableNumber(null);
    setCurrentView("menu");
    localStorage.removeItem(TABLE_NUMBER_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(CURRENT_VIEW_STORAGE_KEY);
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    localStorage.setItem(CURRENT_VIEW_STORAGE_KEY, view);
  };

  // Wait for hydration to avoid hydration mismatch
  if (!isHydrated) {
    return null;
  }

  // Show table number input first, then decide between customer or staff
  if (tableNumber === null && (currentView === "menu" || !currentView)) {
    return (
      <>
        <TableNumberInput
          onTableNumberSet={handleTableNumberSet}
          onStaffLogin={() => setLoginModalOpen(true)}
        />
        <StaffLoginModal
          open={loginModalOpen}
          onOpenChange={setLoginModalOpen}
          onLogin={handleStaffLogin}
        />
      </>
    );
  }

  // Staff views (kitchen/admin) need RestaurantProvider for data access
  if (currentView === "kitchen" || currentView === "admin") {
    return <StaffContent currentView={currentView} onLogout={handleLogout} />;
  }

  // Customer view needs RestaurantProvider
  return (
    <RestaurantProvider initialTableNumber={tableNumber || 1}>
      <CustomerContent
        onChangeTable={handleChangeTable}
        currentView={currentView}
        onViewChange={handleViewChange}
        onStaffLoginClick={() => setLoginModalOpen(true)}
      />
    </RestaurantProvider>
  );
}
