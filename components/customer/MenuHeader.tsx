"use client";

import Image from "next/image";
import { ShoppingBag, ClipboardList, UserCog, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurant } from "@/context/RestaurantContext";

interface MenuHeaderProps {
  onCartClick: () => void;
  onOrdersClick: () => void;
  onStaffLogin: () => void;
  onChangeTable: () => void;
}

export function MenuHeader({
  onCartClick,
  onOrdersClick,
  onStaffLogin,
  onChangeTable,
}: MenuHeaderProps) {
  const { tableNumber, cartItemCount, cartTotal, orders } = useRestaurant();
  const myActiveOrders = orders.filter(
    (o) => o.tableNumber === tableNumber && o.status !== "Completed",
  );

  return (
    <header className="bg-background border-b border-border/50">
      <div className="container mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <Image
              src="/foodfavicon.png"
              alt="QUICKBITE Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent tracking-tight leading-none">
                QUICKBITE
              </h1>
              <div className="flex items-baseline gap-2">
                <span className="text-sm uppercase tracking-widest text-muted-foreground/80 font-semibold">
                  Table
                </span>
                <span className="text-2xl font-serif font-bold text-primary tracking-tight">
                  {tableNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 text-xs tracking-wide h-8 px-2 transition-colors"
              onClick={onChangeTable}
              title="Change table number"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Change Table
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 text-xs tracking-wide h-8 px-2 transition-colors"
              onClick={onStaffLogin}
            >
              <UserCog className="h-3.5 w-3.5 mr-1.5" />
              Staff
            </Button>

            {/* Orders Button */}
            <Button
              variant="default"
              size="icon"
              className="relative h-11 w-11 rounded-full bg-green-600 hover:bg-green-700 transition-colors"
              onClick={onOrdersClick}
            >
              <ClipboardList className="h-5 w-5 text-white" />
              {myActiveOrders.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-semibold flex items-center justify-center">
                  {myActiveOrders.length}
                </span>
              )}
              <span className="sr-only">View orders</span>
            </Button>

            {/* Cart Button */}
            <Button
              variant="default"
              size="sm"
              className="h-11 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 gap-2 font-medium"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 ? (
                <>
                  <span className="hidden sm:inline">Cart</span>
                  <span className="bg-primary-foreground/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {cartItemCount}
                  </span>
                </>
              ) : (
                <span>Cart</span>
              )}
            </Button>
          </div>

          {/* Mobile - Change Table Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden h-10 w-10 rounded-full"
            onClick={onChangeTable}
            title="Change table number"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
