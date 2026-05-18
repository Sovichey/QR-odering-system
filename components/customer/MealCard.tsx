"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meal } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/helpers";
import { useRestaurant } from "@/context/RestaurantContext";
import { toast } from "sonner";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const { addToCart } = useRestaurant();

  const handleAddToCart = () => {
    addToCart(meal);
    toast.success(`${meal.name} added to cart`, {
      duration: 2000,
    });
  };

  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary/50">
        <Image
          src={meal.image}
          alt={meal.name}
          fill
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

        {/* Add button */}
        <Button
          size="icon"
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-background/95 text-foreground hover:bg-background shadow-lg opacity-100 translate-y-0 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add {meal.name} to cart</span>
        </Button>
      </div>

      {/* Content */}
      <div className="pt-3 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors">
              {meal.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
              {meal.description}
            </p>
          </div>
          <span className="text-base font-semibold text-foreground whitespace-nowrap pt-0.5 tabular-nums">
            {formatCurrency(meal.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
