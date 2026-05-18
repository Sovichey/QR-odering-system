"use client";

import { useState } from "react";
import { ShoppingBag, ClipboardList, UserCog, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRestaurant } from "@/context/RestaurantContext";

interface MenuHeaderProps {
  onCartClick: () => void;
  onOrdersClick: () => void;
  onStaffLogin: () => void;
}

export function MenuHeader({
  onCartClick,
  onOrdersClick,
  onStaffLogin,
}: MenuHeaderProps) {
  const { tableNumber, cartItemCount, cartTotal, orders } = useRestaurant();
  const myActiveOrders = orders.filter(
    (o) => o.tableNumber === tableNumber && o.status !== "Completed",
  );
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/50">
      <div className="container mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent tracking-tight leading-none">
                The Menu
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

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] p-0 flex flex-col"
              >
                <SheetHeader className="border-b border-border/50 px-6 py-5 sticky top-0 bg-background/95 backdrop-blur-sm">
                  <SheetTitle className="text-lg font-semibold">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3 mt-6 px-4 flex-1 pb-6">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Main
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base h-11 px-4 rounded-lg hover:bg-muted/50 text-foreground"
                      onClick={() => {
                        onStaffLogin();
                        setOpen(false);
                      }}
                    >
                      <UserCog className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Staff Login</span>
                    </Button>
                  </div>

                  <div className="border-t border-border/30 my-2" />

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Orders & Cart
                    </p>
                    <Button
                      className="w-full justify-start text-base relative h-11 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                      onClick={() => {
                        onOrdersClick();
                        setOpen(false);
                      }}
                    >
                      <ClipboardList className="h-5 w-5 mr-3" />
                      <span>Orders</span>
                      {myActiveOrders.length > 0 && (
                        <span className="ml-auto bg-white/20 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                          {myActiveOrders.length}
                        </span>
                      )}
                    </Button>

                    <Button
                      className="w-full justify-start text-base h-11 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                      onClick={() => {
                        onCartClick();
                        setOpen(false);
                      }}
                    >
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="ml-auto bg-white/20 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                          {cartItemCount}
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
