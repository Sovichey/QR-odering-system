"use client";

import { useState } from "react";
import { ChefHat, LayoutDashboard, Lock, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type StaffRole = "kitchen" | "admin";

interface StaffLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (role: StaffRole) => void;
}

// Demo credentials for demonstration
const DEMO_CREDENTIALS = {
  kitchen: { pin: "1234" },
  admin: { pin: "0000" },
};

export function StaffLoginModal({
  open,
  onOpenChange,
  onLogin,
}: StaffLoginModalProps) {
  const [selectedRole, setSelectedRole] = useState<StaffRole | null>(null);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (role: StaffRole) => {
    setSelectedRole(role);
    setPin("");
    setError("");
  };

  const handleLogin = () => {
    if (!selectedRole) return;

    const correctPin = DEMO_CREDENTIALS[selectedRole].pin;
    if (pin === correctPin) {
      onLogin(selectedRole);
      onOpenChange(false);
      // Reset state
      setSelectedRole(null);
      setPin("");
      setError("");
    } else {
      setError("Incorrect PIN. Please try again.");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedRole(null);
    setPin("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Staff Login</DialogTitle>
          <DialogDescription>
            Select your role and enter your PIN to access the staff dashboard.
          </DialogDescription>
        </DialogHeader>
        {!selectedRole ? (
          <div className="grid grid-cols-2 gap-4 py-4">
            <button
              onClick={() => handleRoleSelect("kitchen")}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
                "hover:border-blue-400 hover:bg-blue-50/50",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              )}
            >
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                <ChefHat className="h-7 w-7 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Kitchen</p>
                <p className="text-xs text-muted-foreground">
                  View and manage orders
                </p>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("admin")}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all",
                "hover:border-emerald-400 hover:bg-emerald-50/50",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
              )}
            >
              <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <LayoutDashboard className="h-7 w-7 text-emerald-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">
                  Dashboard and analytics
                </p>
              </div>
            </button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  selectedRole === "kitchen" ? "bg-blue-100" : "bg-emerald-100",
                )}
              >
                {selectedRole === "kitchen" ? (
                  <ChefHat className={cn("h-5 w-5", "text-blue-600")} />
                ) : (
                  <LayoutDashboard
                    className={cn("h-5 w-5", "text-emerald-600")}
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">
                  {selectedRole}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedRole === "kitchen"
                    ? "Kitchen Staff"
                    : "Administrator"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-muted-foreground"
                onClick={() => setSelectedRole(null)}
              >
                Change
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                Enter PIN
              </Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.slice(0, 4));
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && pin.length === 4) {
                      handleLogin();
                    }
                  }}
                  className="pr-10"
                  maxLength={4}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                Demo PINs: Kitchen = 1234, Admin = 0000
              </p>
            </div>

            <Button
              onClick={handleLogin}
              disabled={pin.length !== 4}
              className={cn(
                "w-full",
                selectedRole === "kitchen"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-emerald-600 hover:bg-emerald-700",
              )}
            >
              Sign In
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
