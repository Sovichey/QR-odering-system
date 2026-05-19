"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  ChefHat,
  CheckCircle2,
  MessageSquare,
  LogOut,
  Grid3X3,
  List,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { formatTimeElapsed, formatCurrency } from "@/lib/utils/helpers";
import { useRestaurant } from "@/context/RestaurantContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

function OrderCard({
  order,
  viewMode,
}: OrderCardProps & { viewMode: "grid" | "list" }) {
  const { updateOrderStatus, completeOrder } = useRestaurant();
  const [timeDisplay, setTimeDisplay] = useState(
    formatTimeElapsed(order.createdAt),
  );

  // Update time display every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDisplay(formatTimeElapsed(order.createdAt));
    }, 30000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const handleStatusChange = async () => {
    if (order.status === "Pending") {
      await updateOrderStatus(order.id, "Preparing");
      toast.info(`Order for Table ${order.tableNumber} is now preparing`);
    } else if (order.status === "Preparing") {
      await completeOrder(order.id);
      toast.success(`Order for Table ${order.tableNumber} completed!`);
    }
  };

  const statusConfig = {
    Pending: {
      variant: "secondary" as const,
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    Preparing: {
      variant: "secondary" as const,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Completed: {
      variant: "secondary" as const,
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 p-2 md:p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all min-h-auto md:min-h-[120px]">
        {/* Table Number Box */}
        <div
          className={cn(
            "flex-shrink-0 rounded-xl md:rounded-2xl p-2 md:p-6 text-center min-w-[65px] md:min-w-[110px] flex flex-col items-center justify-center shadow-md border-2 font-bold md:self-start bg-gray-100 text-gray-800 border-gray-200",
          )}
        >
          <p className="text-[10px] md:text-sm font-semibold tracking-wide opacity-75">
            Table
          </p>
          <p className="text-lg md:text-4xl font-bold leading-tight">
            {order.tableNumber}
          </p>
        </div>

        {/* Center Section: Time and Items */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-1 md:gap-2 text-[11px] md:text-sm text-muted-foreground mb-1 md:mb-2">
            <Clock className="h-3 md:h-4 w-3 md:w-4 flex-shrink-0" />
            <span>{timeDisplay}</span>
          </div>
          <div className="space-y-0.5 md:space-y-1 flex-1">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="text-[11px] md:text-sm text-foreground"
              >
                <span className="font-medium text-primary">
                  {item.quantity}x
                </span>{" "}
                {item.mealName}
              </div>
            ))}
          </div>
          {order.note && (
            <div className="mt-2 p-2 md:p-3 rounded-lg bg-amber-50 border border-amber-200 w-fit">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-3 md:h-4 w-3 md:w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] md:text-xs font-medium text-amber-800 mb-0.5">
                    Special Instructions
                  </p>
                  <p className="text-[10px] md:text-sm text-amber-700 break-words whitespace-normal">
                    {order.note}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Status, Total, Button */}
        <div className="flex flex-col items-end gap-1 md:gap-3 flex-shrink-0 md:justify-between md:self-stretch">
          <Badge
            variant={statusConfig[order.status].variant}
            className={cn(
              statusConfig[order.status].className,
              "text-[10px] md:text-sm",
            )}
          >
            {order.status}
          </Badge>

          <div className="md:flex-1" />

          <div className="flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-3 md:justify-between w-full">
            <p className="text-[10px] md:text-sm font-bold text-foreground whitespace-nowrap">
              Total: {formatCurrency(order.totalPrice)}
            </p>

            <Button
              onClick={handleStatusChange}
              className={cn(
                "h-7 md:h-9 px-2 md:px-4 text-[10px] md:text-sm font-medium flex-shrink-0",
                order.status === "Pending" &&
                  "bg-blue-600 hover:bg-blue-700 text-white",
                order.status === "Preparing" &&
                  "bg-emerald-600 hover:bg-emerald-700 text-white",
              )}
            >
              {order.status === "Pending" ? "Start" : "Complete"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout
  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-md flex flex-col",
        order.status === "Pending" && "border-amber-200",
        order.status === "Preparing" && "border-blue-200",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Table {order.tableNumber}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{timeDisplay}</span>
            </div>
          </div>
          <Badge
            variant={statusConfig[order.status].variant}
            className={statusConfig[order.status].className}
          >
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 pt-0">
        <div className="space-y-2 flex-1">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground">
                <span className="font-medium text-primary">
                  {item.quantity}x
                </span>{" "}
                {item.mealName}
              </span>
              <span className="text-muted-foreground">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        {order.note && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-amber-800 mb-1">
                  Special Instructions
                </p>
                <p className="text-sm text-amber-700">{order.note}</p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-3 mt-auto pt-4 border-t border-border">
          <div className="w-full flex items-center justify-between">
            <span className="font-bold text-lg text-foreground">Total:</span>
            <span className="font-bold text-lg text-foreground">
              {formatCurrency(order.totalPrice)}
            </span>
          </div>
          <Button
            onClick={handleStatusChange}
            className={cn(
              "gap-2 font-medium w-full",
              order.status === "Pending" &&
                "bg-blue-600 hover:bg-blue-700 text-white",
              order.status === "Preparing" &&
                "bg-emerald-600 hover:bg-emerald-700 text-white",
            )}
          >
            {order.status === "Pending" ? (
              <>
                <ChefHat className="h-4 w-4" />
                <span>Start Preparing</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark as Completed</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface KitchenViewProps {
  onLogout: () => void;
}

export function KitchenView({ onLogout }: KitchenViewProps) {
  const { orders } = useRestaurant();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Force grid view on mobile (width < 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    window.addEventListener("resize", handleResize);
    // Check on initial render
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeOrders = orders.filter((order) => order.status !== "Completed");
  const pendingOrders = activeOrders.filter(
    (order) => order.status === "Pending",
  );
  const preparingOrders = activeOrders.filter(
    (order) => order.status === "Preparing",
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <div className="h-8 md:h-10 w-8 md:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ChefHat className="h-4 md:h-5 w-4 md:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg md:text-2xl font-bold text-foreground truncate">
                  Kitchen Orders
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {activeOrders.length} active order
                  {activeOrders.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-3 items-center flex-shrink-0">
              <div className="text-center px-3 md:px-4 py-2 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xl md:text-2xl font-bold text-amber-600">
                  {pendingOrders.length}
                </p>
                <p className="text-xs text-amber-700">Pending</p>
              </div>
              <div className="text-center px-3 md:px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-xl md:text-2xl font-bold text-blue-600">
                  {preparingOrders.length}
                </p>
                <p className="text-xs text-blue-700">Preparing</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden gap-1 text-muted-foreground hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors flex-shrink-0 text-xs px-2"
              onClick={onLogout}
            >
              <LogOut className="h-3 w-3" />
            </Button>
          </div>
          {/* Mobile Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 md:hidden">
            <div className="text-center px-2 py-1 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-lg font-bold text-amber-600">
                {pendingOrders.length}
              </p>
              <p className="text-[10px] text-amber-700">Pending</p>
            </div>
            <div className="text-center px-2 py-1 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-lg font-bold text-blue-600">
                {preparingOrders.length}
              </p>
              <p className="text-[10px] text-blue-700">Preparing</p>
            </div>
          </div>
        </div>
        {/* View Mode Toolbar */}
        <div className="hidden md:block border-t border-border bg-background/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex gap-2 justify-end">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {activeOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <ChefHat className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No Active Orders
            </h2>
            <p className="text-muted-foreground">
              New orders will appear here automatically
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
            {/* Show Pending orders first, then Preparing */}
            {[...pendingOrders, ...preparingOrders].map((order) => (
              <OrderCard key={order.id} order={order} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* List view */}
            {[...pendingOrders, ...preparingOrders].map((order) => (
              <OrderCard key={order.id} order={order} viewMode={viewMode} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
