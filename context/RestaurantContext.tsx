"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Meal, CartItem, Order, OrderItem, Metrics } from "@/lib/types";
import { mockMeals } from "@/lib/data/mockMeals";
import {
  initialMockOrders,
  completedOrdersHistory,
} from "@/lib/data/mockOrders";
import { generateOrderId } from "@/lib/utils/helpers";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper to convert Firestore Timestamp to Date
function convertFirestoreTimestamp(timestamp: any): Date {
  if (!timestamp) return new Date();

  // If it's already a Date, return it
  if (timestamp instanceof Date) return timestamp;

  // If it has a toDate method (Firestore Timestamp), use it
  if (typeof timestamp.toDate === "function") return timestamp.toDate();

  // If it's a string or number, try to parse it
  if (typeof timestamp === "string" || typeof timestamp === "number") {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  // Fallback to current date
  return new Date();
}

interface RestaurantContextType {
  // Data
  meals: Meal[];
  cart: CartItem[];
  orders: Order[];
  completedOrders: Order[];
  metrics: Metrics;
  tableNumber: number;
  orderNote: string;

  // Cart Actions
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
  setOrderNote: (note: string) => void;

  // Order Actions
  placeOrder: () => Promise<void>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"],
  ) => Promise<void>;
  completeOrder: (orderId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<boolean>;

  // UI State
  cartItemCount: number;
  cartTotal: number;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "restaurant_cart";

export function RestaurantProvider({
  children,
  initialTableNumber = 4,
}: {
  children: React.ReactNode;
  initialTableNumber?: number;
}) {
  const [meals] = useState<Meal[]>(mockMeals);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // Start empty, use Firestore as source
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]); // Start empty, use Firestore as source
  const [tableNumber] = useState(initialTableNumber);
  const [orderNote, setOrderNote] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Restore meal objects from mockMeals
        const hydratedCart = parsedCart
          .map((item: any) => {
            const meal = meals.find((m) => m.id === item.meal.id);
            return meal ? { ...item, meal } : null;
          })
          .filter((item: CartItem | null) => item !== null);
        setCart(hydratedCart);
        console.log("🛒 Cart restored from localStorage:", hydratedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    setIsHydrated(true);
  }, [meals]);

  // Save cart to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        console.log("💾 Cart saved to localStorage:", cart);
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cart, isHydrated]);

  // Calculate metrics
  const metrics: Metrics = {
    todayRevenue:
      completedOrders.reduce((sum, order) => sum + order.totalPrice, 0) +
      orders
        .filter((o) => o.status === "Completed")
        .reduce((sum, order) => sum + order.totalPrice, 0),
    activeTables: new Set(
      orders.filter((o) => o.status !== "Completed").map((o) => o.tableNumber),
    ).size,
    totalOrdersCompleted:
      completedOrders.length +
      orders.filter((o) => o.status === "Completed").length,
    averagePrepTime: 22, // Mock average
  };

  // Cart calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.meal.price * item.quantity,
    0,
  );

  // Cart actions
  const addToCart = useCallback((meal: Meal) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { meal, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((mealId: string) => {
    setCart((prev) => prev.filter((item) => item.meal.id !== mealId));
  }, []);

  const updateQuantity = useCallback((mealId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.meal.id !== mealId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.meal.id === mealId ? { ...item, quantity } : item,
        ),
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Order actions
  const placeOrder = useCallback(async () => {
    if (cart.length === 0) return;

    try {
      const orderItems: OrderItem[] = cart.map((item) => ({
        mealId: item.meal.id,
        mealName: item.meal.name,
        quantity: item.quantity,
        price: item.meal.price,
      }));

      const newOrderData = {
        tableNumber,
        items: orderItems,
        totalPrice: cartTotal,
        status: "Pending",
        note: orderNote.trim() || null,
        createdAt: new Date(),
      };

      // Save to Firestore (real-time listener will pick it up)
      console.log("💾 Saving order to Firestore:", newOrderData);
      await addDoc(collection(db, "orders"), newOrderData);

      // Clear cart and localStorage
      setCart([]);
      localStorage.removeItem(CART_STORAGE_KEY);
      setOrderNote("");
      console.log("✅ Order placed and saved to Firestore");
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }, [cart, tableNumber, cartTotal, orderNote]);

  const updateOrderStatus = useCallback(
    async (orderId: string, status: Order["status"]) => {
      try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status });
        // Real-time listener will pick up the change
        console.log(`✅ Order ${orderId} status updated to ${status}`);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    },
    [],
  );

  const completeOrder = useCallback(async (orderId: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      const completedAt = new Date();
      await updateDoc(orderRef, {
        status: "Completed",
        completedAt,
      });
      // Real-time listener will move it to completedOrders
      console.log(`✅ Order ${orderId} completed`);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  }, []);

  // Cancel order - only allowed if status is "Pending"
  const cancelOrder = useCallback(
    async (orderId: string): Promise<boolean> => {
      try {
        const order = orders.find((o) => o.id === orderId);
        if (!order || order.status !== "Pending") {
          return false; // Cannot cancel if not pending
        }
        const orderRef = doc(db, "orders", orderId);
        await deleteDoc(orderRef);
        // Real-time listener will remove it from state
        console.log(`✅ Order ${orderId} cancelled`);
        return true;
      } catch (error) {
        console.error("Error canceling order:", error);
        return false;
      }
    },
    [orders],
  );

  // Real-time listener for orders from Firestore
  useEffect(() => {
    try {
      // Query for all orders and filter on client side
      // (Firestore != operator requires index, so we get all and filter)
      const q = query(collection(db, "orders"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const updatedOrders: Order[] = [];
          const updatedCompletedOrders: Order[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();

            // Debug log for data validation
            if (
              !data.tableNumber ||
              !data.items ||
              data.totalPrice === undefined
            ) {
              console.warn(`⚠️ Incomplete order data for ${doc.id}:`, {
                tableNumber: data.tableNumber,
                items: data.items?.length || 0,
                totalPrice: data.totalPrice,
              });
            }

            const order: Order = {
              id: doc.id,
              tableNumber: data.tableNumber || 0,
              items: Array.isArray(data.items) ? data.items : [],
              totalPrice:
                typeof data.totalPrice === "number" ? data.totalPrice : 0,
              status: data.status || "Pending",
              note: data.note || undefined,
              createdAt: convertFirestoreTimestamp(data.createdAt),
              completedAt:
                convertFirestoreTimestamp(data.completedAt) || undefined,
            };

            // Separate active and completed orders
            if (order.status === "Completed") {
              updatedCompletedOrders.push(order);
            } else {
              updatedOrders.push(order);
            }
          });

          // Sort by newest first
          updatedOrders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          updatedCompletedOrders.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

          setOrders(updatedOrders);
          setCompletedOrders(updatedCompletedOrders);

          console.log(
            "📦 Orders updated from Firestore:",
            updatedOrders.length,
            "active,",
            updatedCompletedOrders.length,
            "completed",
          );
        },
        (error) => {
          console.error("❌ Firestore listener error:", error);
        },
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("❌ Error setting up Firestore listener:", error);
    }
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        meals,
        cart,
        orders,
        completedOrders,
        metrics,
        tableNumber,
        orderNote,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setOrderNote,
        placeOrder,
        updateOrderStatus,
        completeOrder,
        cancelOrder,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
