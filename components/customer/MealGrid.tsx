"use client"

import { Meal } from "@/lib/types"
import { MealCard } from "./MealCard"
import { Category } from "./MenuCategories"

interface MealGridProps {
  meals: Meal[]
  activeCategory: Category
}

export function MealGrid({ meals, activeCategory }: MealGridProps) {
  const filteredMeals =
    activeCategory === "All" ? meals : meals.filter((meal) => meal.category === activeCategory)

  if (filteredMeals.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No items found in this category.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
      {filteredMeals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  )
}
