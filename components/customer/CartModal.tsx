"use client";

import { useState } from "react";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  Loader2,
  StickyNote,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useRestaurant } from "@/context/RestaurantContext";
import { formatCurrency } from "@/lib/utils/helpers";
import { toast } from "sonner";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    placeOrder,
    clearCart,
    tableNumber,
    orderNote,
    setOrderNote,
  } = useRestaurant();
  const [isPlacing, setIsPlacing] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    setIsPlacing(true);
    try {
      await placeOrder();
      toast.success("Order placed successfully!", {
        description: `Your order for Table ${tableNumber} is being prepared.`,
        duration: 4000,
      });
      onOpenChange(false);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0 gap-0 border-l-0 sm:border-l bg-background overflow-hidden">
        {/* Header */}
        <SheetHeader className="px-6 py-6 border-b border-border/50 bg-background sticky top-0 z-10">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl font-serif font-semibold tracking-tight text-foreground">
                Your Order
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
              <span className="sr-only">Close cart</span>
            </Button>
          </div>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
            <div className="h-24 w-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground max-w-[240px]">
              Browse our menu and add items to get started
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1 min-h-0 relative">
              <div className="px-6 py-4">
                {cart.length > 0 && (
                  <div className="mb-3 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/15 text-xs font-medium gap-1"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Cart
                    </Button>
                  </div>
                )}
                <div className="space-y-1">
                  {cart.map((item, index) => (
                    <div key={item.meal.id}>
                      <div className="flex items-start gap-4 py-5">
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-foreground leading-tight text-base">
                                {item.meal.name}
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {formatCurrency(item.meal.price)} each
                              </p>
                            </div>
                            <p className="font-bold text-foreground tabular-nums text-base">
                              {formatCurrency(item.meal.price * item.quantity)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-4">
                            <div className="flex items-center border border-border bg-secondary/30 rounded-lg px-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 p-0 hover:bg-destructive hover:text-white transition-colors"
                                onClick={() =>
                                  updateQuantity(
                                    item.meal.id,
                                    item.quantity - 1,
                                  )
                                }
                              >
                                <Minus className="h-3.5 w-3.5" />
                                <span className="sr-only">Decrease</span>
                              </Button>
                              <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 p-0 hover:bg-emerald-500 hover:text-white transition-colors"
                                onClick={() =>
                                  updateQuantity(
                                    item.meal.id,
                                    item.quantity + 1,
                                  )
                                }
                              >
                                <Plus className="h-3.5 w-3.5" />
                                <span className="sr-only">Increase</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-muted-foreground hover:text-white hover:bg-destructive/80 text-xs font-medium transition-colors"
                              onClick={() => removeFromCart(item.meal.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < cart.length - 1 && (
                        <Separator className="my-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="px-6 py-5 space-y-4">
                {/* Special Instructions */}
                <div>
                  {!showNote && !orderNote ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-3 text-muted-foreground hover:text-foreground text-sm font-normal rounded-lg border-border/50 hover:bg-muted/50"
                      onClick={() => setShowNote(true)}
                    >
                      <StickyNote className="h-4 w-4 mr-2" />
                      Add special instructions
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Special Instructions
                        </label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          onClick={() => {
                            setShowNote(false);
                            setOrderNote("");
                          }}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">
                            Close special instructions
                          </span>
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Allergies, dietary preferences, special requests..."
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        className="resize-none h-20 text-sm bg-secondary/30 border-border/50 focus:border-primary rounded-lg"
                        maxLength={200}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {orderNote.length}/200
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="my-2" />

                {/* Order Summary */}
                <div className="space-y-3 bg-secondary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium tabular-nums text-foreground">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-muted-foreground text-xs">
                      Included
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-lg font-bold tabular-nums text-primary">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {/* Place Order Button */}
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isPlacing}
                    className="w-full h-11 rounded-lg text-base font-semibold bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    {isPlacing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>Place Order</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
