"use client";

import { useState } from "react";
import { Clock, X, ChefHat, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRestaurant } from "@/context/RestaurantContext";
import { formatCurrency, formatTimeElapsed } from "@/lib/utils/helpers";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ActiveOrdersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActiveOrders({ open, onOpenChange }: ActiveOrdersProps) {
  const { orders, tableNumber, cancelOrder } = useRestaurant();
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null,
  );

  const myOrders = orders.filter((order) => order.tableNumber === tableNumber);

  const handleCancelOrder = async (orderId: string) => {
    const success = await cancelOrder(orderId);
    if (success) {
      toast.success("Order cancelled successfully");
    } else {
      toast.error("Cannot cancel this order", {
        description: "Orders that are being prepared cannot be cancelled.",
      });
    }
    setCancellingOrderId(null);
  };

  const statusConfig = {
    Pending: {
      icon: Clock,
      className: "bg-amber-100 text-amber-800 border-amber-200",
      label: "Pending",
    },
    Preparing: {
      icon: ChefHat,
      className: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Preparing",
    },
    Completed: {
      icon: CheckCircle2,
      className: "bg-emerald-100 text-emerald-800 border-emerald-200",
      label: "Completed",
    },
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0 border-l-0 sm:border-l bg-background overflow-hidden">
          <SheetHeader className="px-6 py-6 border-b border-border/50 bg-background sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="flex items-center gap-3 text-2xl font-serif font-semibold tracking-tight text-foreground">
                  <Clock className="h-6 w-6 text-primary" />
                  Your Orders
                </SheetTitle>
                <p className="text-sm text-muted-foreground mt-1.5">
                  <span className="font-medium">Table</span> {tableNumber}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 mt-0.5"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close orders</span>
              </Button>
            </div>
          </SheetHeader>

          {myOrders.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
              <div className="h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                <Clock className="h-12 w-12 text-muted-foreground/40" />
              </div>
              <p className="text-lg font-semibold text-foreground mb-2">
                No active orders
              </p>
              <p className="text-sm text-muted-foreground max-w-[240px]">
                Your orders will appear here after placing
              </p>
            </div>
          ) : (
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-6 py-5 space-y-3">
                {myOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon;
                  const canCancel = order.status === "Pending";

                  return (
                    <div
                      key={order.id}
                      className={cn(
                        "p-5 rounded-xl border-2 transition-all",
                        order.status === "Pending" &&
                          "border-amber-200 bg-amber-50/40 hover:bg-amber-50/60",
                        order.status === "Preparing" &&
                          "border-blue-200 bg-blue-50/40 hover:bg-blue-50/60",
                        order.status === "Completed" &&
                          "border-emerald-200 bg-emerald-50/40",
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "gap-1.5 px-3 py-1.5 text-xs font-semibold",
                              statusConfig[order.status].className,
                            )}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {statusConfig[order.status].label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2 font-medium">
                            {formatTimeElapsed(order.createdAt)}
                          </p>
                        </div>
                        {canCancel ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/15 gap-1.5 font-medium h-8 px-2"
                            onClick={() => setCancellingOrderId(order.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline text-xs">
                              Cancel
                            </span>
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">
                              Cannot cancel
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-4 pb-4 border-b border-border/30">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground font-medium">
                              <span className="text-primary font-bold">
                                {item.quantity}x
                              </span>{" "}
                              {item.mealName}
                            </span>
                            <span className="font-semibold text-foreground tabular-nums">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.note && (
                        <div className="p-3 rounded-lg bg-secondary/40 mb-4">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold">Note:</span>{" "}
                            {order.note}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3">
                        <span className="text-sm font-semibold text-foreground">
                          Total
                        </span>
                        <span className="text-lg font-bold text-primary tabular-nums">
                          {formatCurrency(order.totalPrice)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={!!cancellingOrderId}
        onOpenChange={() => setCancellingOrderId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                cancellingOrderId && handleCancelOrder(cancellingOrderId)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
