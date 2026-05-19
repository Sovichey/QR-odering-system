"use client";

import { ShoppingBag, ClipboardList, UserCog, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurant } from "@/context/RestaurantContext";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
  onStaffClick: () => void;
  activeTab?: "menu" | "cart" | "orders" | "staff";
}

export function BottomNav({
  onMenuClick,
  onCartClick,
  onOrdersClick,
  onStaffClick,
  activeTab = "menu",
}: BottomNavProps) {
  const { cartItemCount, orders, tableNumber } = useRestaurant();
  const myActiveOrders = orders.filter(
    (o) => o.tableNumber === tableNumber && o.status !== "Completed",
  );

  const navItems = [
    {
      id: "menu",
      label: "Menu",
      icon: Home,
      onClick: onMenuClick,
      badge: null,
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingBag,
      onClick: onCartClick,
      badge: cartItemCount > 0 ? cartItemCount : null,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ClipboardList,
      onClick: onOrdersClick,
      badge: myActiveOrders.length > 0 ? myActiveOrders.length : null,
    },
    {
      id: "staff",
      label: "Staff",
      icon: UserCog,
      onClick: onStaffClick,
      badge: null,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background">
      <div className="grid grid-cols-4 gap-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "relative h-16 flex flex-col items-center justify-center gap-1 transition-all duration-200 rounded-full mx-2 my-2",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
