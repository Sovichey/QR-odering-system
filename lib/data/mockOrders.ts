import { Order } from "../types"

// Helper to create dates relative to now
const minutesAgo = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000)

export const initialMockOrders: Order[] = [
  {
    id: "order-001",
    tableNumber: 3,
    items: [
      { mealId: "meal-4", mealName: "Ribeye Steak", quantity: 2, price: 42.99 },
      { mealId: "meal-7", mealName: "Mushroom Risotto", quantity: 1, price: 19.99 },
    ],
    totalPrice: 105.97,
    status: "Preparing",
    createdAt: minutesAgo(12),
  },
  {
    id: "order-002",
    tableNumber: 7,
    items: [
      { mealId: "meal-1", mealName: "Grilled Salmon", quantity: 1, price: 28.99 },
      { mealId: "meal-2", mealName: "Garlic Butter Shrimp", quantity: 1, price: 24.99 },
      { mealId: "meal-10", mealName: "Chocolate Lava Cake", quantity: 2, price: 12.99 },
    ],
    totalPrice: 79.96,
    status: "Pending",
    createdAt: minutesAgo(5),
  },
  {
    id: "order-003",
    tableNumber: 12,
    items: [
      { mealId: "meal-5", mealName: "Teriyaki Beef Bowl", quantity: 3, price: 22.99 },
    ],
    totalPrice: 68.97,
    status: "Pending",
    createdAt: minutesAgo(2),
  },
  {
    id: "order-004",
    tableNumber: 5,
    items: [
      { mealId: "meal-8", mealName: "Mediterranean Bowl", quantity: 2, price: 17.99 },
      { mealId: "meal-11", mealName: "Crème Brûlée", quantity: 2, price: 10.99 },
    ],
    totalPrice: 57.96,
    status: "Preparing",
    createdAt: minutesAgo(18),
  },
]

// Completed orders for history
export const completedOrdersHistory: Order[] = [
  {
    id: "order-h001",
    tableNumber: 2,
    items: [
      { mealId: "meal-6", mealName: "Beef Wellington", quantity: 2, price: 54.99 },
      { mealId: "meal-3", mealName: "Pan-Seared Sea Bass", quantity: 1, price: 34.99 },
    ],
    totalPrice: 144.97,
    status: "Completed",
    createdAt: minutesAgo(120),
    completedAt: minutesAgo(85),
  },
  {
    id: "order-h002",
    tableNumber: 9,
    items: [
      { mealId: "meal-1", mealName: "Grilled Salmon", quantity: 2, price: 28.99 },
      { mealId: "meal-12", mealName: "Tiramisu", quantity: 2, price: 11.99 },
    ],
    totalPrice: 81.96,
    status: "Completed",
    createdAt: minutesAgo(180),
    completedAt: minutesAgo(150),
  },
  {
    id: "order-h003",
    tableNumber: 4,
    items: [
      { mealId: "meal-4", mealName: "Ribeye Steak", quantity: 1, price: 42.99 },
      { mealId: "meal-7", mealName: "Mushroom Risotto", quantity: 1, price: 19.99 },
      { mealId: "meal-10", mealName: "Chocolate Lava Cake", quantity: 1, price: 12.99 },
    ],
    totalPrice: 75.97,
    status: "Completed",
    createdAt: minutesAgo(240),
    completedAt: minutesAgo(210),
  },
  {
    id: "order-h004",
    tableNumber: 11,
    items: [
      { mealId: "meal-8", mealName: "Mediterranean Bowl", quantity: 4, price: 17.99 },
    ],
    totalPrice: 71.96,
    status: "Completed",
    createdAt: minutesAgo(300),
    completedAt: minutesAgo(280),
  },
  {
    id: "order-h005",
    tableNumber: 6,
    items: [
      { mealId: "meal-2", mealName: "Garlic Butter Shrimp", quantity: 2, price: 24.99 },
      { mealId: "meal-9", mealName: "Eggplant Parmesan", quantity: 1, price: 18.99 },
    ],
    totalPrice: 68.97,
    status: "Completed",
    createdAt: minutesAgo(360),
    completedAt: minutesAgo(335),
  },
]
