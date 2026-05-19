"use client";

import { cn } from "@/lib/utils";
import {
  UtensilsCrossed,
  Fish,
  Beef,
  Drumstick,
  Leaf,
  Wine,
  Cake,
} from "lucide-react";

const categories = [
  { id: "All", label: "All", icon: UtensilsCrossed },
  { id: "Seafood", label: "Seafood", icon: Fish },
  { id: "Beef", label: "Beef", icon: Beef },
  { id: "Chicken", label: "Chicken", icon: Drumstick },
  { id: "Vegetarian", label: "Vegetarian", icon: Leaf },
  { id: "Drinks", label: "Drinks", icon: Wine },
  { id: "Desserts", label: "Desserts", icon: Cake },
] as const;

export type Category = (typeof categories)[number]["id"];

interface MenuCategoriesProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function MenuCategories({
  activeCategory,
  onCategoryChange,
}: MenuCategoriesProps) {
  return (
    <div className="fixed top-[75px] left-0 right-0 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-5">
        <div className="py-4">
          {/* Scrollable categories */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 group",
                    isActive
                      ? "bg-amber-800 text-white shadow-sm"
                      : "bg-secondary/80 text-foreground/70 hover:bg-amber-700 hover:text-white",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive
                        ? "text-white"
                        : "text-foreground/50 group-hover:text-white",
                    )}
                  />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-border" />
    </div>
  );
}
