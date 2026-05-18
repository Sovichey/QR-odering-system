"use client";

import { useState } from "react";
import { useRestaurant } from "@/context/RestaurantContext";
import { MenuHeader } from "@/components/customer/MenuHeader";
import { MenuCategories, Category } from "@/components/customer/MenuCategories";
import { MealGrid } from "@/components/customer/MealGrid";
import { CartModal } from "@/components/customer/CartModal";
import { ActiveOrders } from "@/components/customer/ActiveOrders";

interface CustomerMenuViewProps {
  onStaffLogin: () => void;
}

export function CustomerMenuView({ onStaffLogin }: CustomerMenuViewProps) {
  const { meals } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader
        onCartClick={() => setCartOpen(true)}
        onOrdersClick={() => setOrdersOpen(true)}
        onStaffLogin={onStaffLogin}
      />
      <MenuCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="container mx-auto px-4 py-6 mt-12">
        <MealGrid meals={meals} activeCategory={activeCategory} />
      </main>
      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
      <ActiveOrders open={ordersOpen} onOpenChange={setOrdersOpen} />
    </div>
  );
}
