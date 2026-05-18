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

function RestaurantContent({ onChangeTable }: { onChangeTable: () => void }) {
  const [currentView, setCurrentView] = useState<ViewType>("menu");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleStaffLogin = (role: "kitchen" | "admin") => {
    setCurrentView(role);
  };

  const handleLogout = () => {
    setCurrentView("menu");
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
  const [isHydrated, setIsHydrated] = useState(false);

  // Load table number from localStorage on mount
  useEffect(() => {
    const savedTableNumber = localStorage.getItem(TABLE_NUMBER_STORAGE_KEY);
    if (savedTableNumber) {
      setTableNumber(parseInt(savedTableNumber, 10));
    }
    setIsHydrated(true);
  }, []);

  const handleTableNumberSet = (num: number) => {
    setTableNumber(num);
    localStorage.setItem(TABLE_NUMBER_STORAGE_KEY, num.toString());
  };

  const handleChangeTable = () => {
    setTableNumber(null);
    localStorage.removeItem(TABLE_NUMBER_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
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
      <RestaurantContent onChangeTable={handleChangeTable} />
    </RestaurantProvider>
  );
}
