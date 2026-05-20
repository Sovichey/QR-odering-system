"use client";

import { useState, useEffect } from "react";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuHeader } from "@/components/customer/MenuHeader";
import { MenuCategories, Category } from "@/components/customer/MenuCategories";
import { MealGrid } from "@/components/customer/MealGrid";
import { CartModal } from "@/components/customer/CartModal";
import { ActiveOrders } from "@/components/customer/ActiveOrders";
import { BottomNav } from "@/components/customer/BottomNav";

interface CustomerMenuViewProps {
  onStaffLogin: () => void;
  onChangeTable: () => void;
  staffLoginOpen?: boolean;
}

export function CustomerMenuView({
  onStaffLogin,
  onChangeTable,
  staffLoginOpen = false,
}: CustomerMenuViewProps) {
  const { meals } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState<
    "menu" | "cart" | "orders" | "staff"
  >("menu");

  // Reset tab to menu when staff login modal closes
  useEffect(() => {
    if (!staffLoginOpen && activeNavTab === "staff") {
      setActiveNavTab("menu");
    }
  }, [staffLoginOpen, activeNavTab]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <MenuHeader
        onCartClick={() => {
          setCartOpen(true);
          setActiveNavTab("cart");
        }}
        onOrdersClick={() => {
          setOrdersOpen(true);
          setActiveNavTab("orders");
        }}
        onStaffLogin={onStaffLogin}
        onChangeTable={onChangeTable}
      />
      <MenuCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="container mx-auto px-4 py-6">
        <MealGrid meals={meals} activeCategory={activeCategory} />
      </main>
      <CartModal
        open={cartOpen}
        onOpenChange={(open) => {
          setCartOpen(open);
          if (!open) {
            setActiveNavTab("menu");
          }
        }}
      />
      <ActiveOrders
        open={ordersOpen}
        onOpenChange={(open) => {
          setOrdersOpen(open);
          if (!open) {
            setActiveNavTab("menu");
          }
        }}
      />

      {/* Bottom Navigation */}
      <BottomNav
        onMenuClick={() => {
          setActiveNavTab("menu");
          setCartOpen(false);
          setOrdersOpen(false);
        }}
        onCartClick={() => {
          setCartOpen(true);
          setActiveNavTab("cart");
        }}
        onOrdersClick={() => {
          setOrdersOpen(true);
          setActiveNavTab("orders");
        }}
        onStaffClick={() => {
          onStaffLogin();
          setActiveNavTab("staff");
        }}
        activeTab={activeNavTab}
      />
    </div>
  );
}
