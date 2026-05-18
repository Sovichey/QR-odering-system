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

function RestaurantContent({
  onChangeTable,
  currentView: initialView,
  onViewChange,
}: {
  onChangeTable: () => void;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
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

  const handleLogout = () => {
    handleViewChange("menu");
  };

  return (
    <>
      {currentView === "menu" && (
        <CustomerMenuView
          onStaffLogin={() => setLoginModalOpen(true)}
          onChangeTable={onChangeTable}
        />
      )}
      {currentView === "kitchen" && <KitchenView onLogout={handleLogout} />}
      {currentView === "admin" && <AdminDashboard onLogout={handleLogout} />}

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

  // Show table number input first, then the restaurant content
  if (tableNumber === null) {
    return <TableNumberInput onTableNumberSet={handleTableNumberSet} />;
  }

  return (
    <RestaurantProvider initialTableNumber={tableNumber}>
      <RestaurantContent
        onChangeTable={handleChangeTable}
        currentView={currentView}
        onViewChange={handleViewChange}
      />
    </RestaurantProvider>
  );
}
