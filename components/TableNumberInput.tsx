"use client";

import { useState } from "react";
import { QrCode, ArrowRight, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TableNumberInputProps {
  onTableNumberSet: (tableNumber: number) => void;
  onStaffLogin: () => void;
}

export function TableNumberInput({
  onTableNumberSet,
  onStaffLogin,
}: TableNumberInputProps) {
  const [tableNumber, setTableNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, max 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setTableNumber(value);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!tableNumber.trim()) {
      setError("Please enter a table number");
      return;
    }

    const num = parseInt(tableNumber, 10);
    if (num < 1 || num > 99) {
      setError("Table number must be between 1 and 99");
      return;
    }

    setIsSubmitting(true);
    // Simulate small delay for better UX
    setTimeout(() => {
      onTableNumberSet(num);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Quick select buttons
  const quickTableNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold font-serif text-foreground">
              Welcome
            </h1>
            <p className="text-muted-foreground">
              Enter your table number to get started
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter table #"
                value={tableNumber}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={cn(
                  "text-center text-3xl font-bold h-16 tracking-widest",
                  error && "border-red-500 focus-visible:ring-red-500",
                )}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          {/* Quick Select Buttons */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground text-center uppercase tracking-wide">
              Quick Select
            </p>
            <div className="grid grid-cols-5 gap-2">
              {quickTableNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setTableNumber(num.toString());
                    setError("");
                  }}
                  className={cn(
                    "py-2.5 rounded-lg font-semibold text-sm transition-all duration-200",
                    tableNumber === num.toString()
                      ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95",
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!tableNumber.trim() || isSubmitting}
            size="lg"
            className="w-full h-12 font-semibold text-base gap-2 group"
          >
            {isSubmitting ? (
              <>
                <Check className="h-5 w-5 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                Continue to Menu
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          {/* Footer Info */}
          <div className="text-center space-y-4 pt-4 border-t border-border/50">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Tip:</span> Scan the QR code on
                your table to get here
              </p>
              <p className="text-xs text-muted-foreground">
                This number helps us track your order
              </p>
            </div>

            {/* Staff Login Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onStaffLogin}
              className="w-full gap-2 text-xs font-medium"
            >
              <Lock className="h-3.5 w-3.5" />
              Staff Login (PIN)
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
