export interface Meal {
  id: string
  name: string
  description: string
  price: number
  category: "Seafood" | "Beef" | "Chicken" | "Vegetarian" | "Drinks" | "Desserts"
  image: string
  preparationTime: number // in minutes
}

export interface CartItem {
  meal: Meal
  quantity: number
}

export interface OrderItem {
  mealId: string
  mealName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  tableNumber: number
  items: OrderItem[]
  totalPrice: number
  status: "Pending" | "Preparing" | "Completed"
  note?: string
  createdAt: Date
  completedAt?: Date
}

export interface Metrics {
  todayRevenue: number
  activeTables: number
  totalOrdersCompleted: number
  averagePrepTime: number // in minutes
}

export type ViewType = "menu" | "kitchen" | "admin"
