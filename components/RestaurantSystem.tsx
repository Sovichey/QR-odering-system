"use client";

import { useState } from "react";
import { RestaurantProvider } from "@/context/RestaurantContext";
import { CustomerMenuView } from "@/components/views/CustomerMenuView";
import { KitchenView } from "@/components/views/KitchenView";
import { AdminDashboard } from "@/components/views/AdminDashboard";
import { StaffLoginModal } from "@/components/staff/StaffLoginModal";
import { TableNumberInput } from "@/components/TableNumberInput";
import { ViewType } from "@/lib/types";

function RestaurantContent() {
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
        <CustomerMenuView onStaffLogin={() => setLoginModalOpen(true)} />
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

  // Show table number input first, then the restaurant content
  if (tableNumber === null) {
    return <TableNumberInput onTableNumberSet={setTableNumber} />;
  }

  return (
    <RestaurantProvider initialTableNumber={tableNumber}>
      <RestaurantContent />
    </RestaurantProvider>
  );
}
