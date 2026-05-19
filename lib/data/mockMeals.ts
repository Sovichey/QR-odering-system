import { Meal } from "../types";

export const mockMeals: Meal[] = [
  // Seafood
  {
    id: "meal-1",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon with lemon herb butter, served with seasonal vegetables",
    price: 28.99,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    preparationTime: 18,
  },
  {
    id: "meal-2",
    name: "Garlic Butter Shrimp",
    description:
      "Jumbo shrimp sautéed in garlic butter with white wine and fresh herbs",
    price: 24.99,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=300&fit=crop",
    preparationTime: 15,
  },
  {
    id: "meal-3",
    name: "Pan-Seared Sea Bass",
    description:
      "Chilean sea bass with crispy skin, served with miso glaze and bok choy",
    price: 34.99,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    preparationTime: 22,
  },
  // Beef
  {
    id: "meal-4",
    name: "Ribeye Steak",
    description:
      "12oz prime ribeye, grilled to perfection with truffle butter and roasted potatoes",
    price: 42.99,
    category: "Beef",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    preparationTime: 25,
  },
  {
    id: "meal-5",
    name: "Teriyaki Beef Bowl",
    description:
      "Tender sliced beef with house-made teriyaki glaze, jasmine rice and vegetables",
    price: 22.99,
    category: "Beef",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    preparationTime: 18,
  },
  {
    id: "meal-6",
    name: "Beef Wellington",
    description:
      "Premium beef tenderloin wrapped in pâté and puff pastry, with red wine reduction",
    price: 54.99,
    category: "Beef",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    preparationTime: 35,
  },
  // Vegetarian
  {
    id: "meal-7",
    name: "Mushroom Risotto",
    description:
      "Creamy arborio rice with wild mushrooms, parmesan and fresh truffle oil",
    price: 19.99,
    category: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
    preparationTime: 20,
  },
  {
    id: "meal-8",
    name: "Mediterranean Bowl",
    description:
      "Quinoa with roasted vegetables, feta, hummus and tahini dressing",
    price: 17.99,
    category: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    preparationTime: 12,
  },
  {
    id: "meal-9",
    name: "Eggplant Parmesan",
    description:
      "Layers of breaded eggplant with marinara sauce and melted mozzarella",
    price: 18.99,
    category: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop",
    preparationTime: 25,
  },
  // Desserts
  {
    id: "meal-10",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 12.99,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
    preparationTime: 15,
  },
  {
    id: "meal-11",
    name: "Crème Brûlée",
    description:
      "Classic vanilla custard with caramelized sugar crust and fresh berries",
    price: 10.99,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
    preparationTime: 10,
  },
  {
    id: "meal-12",
    name: "Tiramisu",
    description:
      "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone",
    price: 11.99,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    preparationTime: 8,
  },
  // Chicken
  {
    id: "meal-13",
    name: "Grilled Chicken Breast",
    description:
      "Herb-marinated chicken breast with roasted vegetables and lemon sauce",
    price: 21.99,
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop",
    preparationTime: 18,
  },
  {
    id: "meal-14",
    name: "Chicken Parmesan",
    description:
      "Crispy breaded chicken topped with marinara and melted mozzarella",
    price: 23.99,
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
    preparationTime: 22,
  },
  {
    id: "meal-15",
    name: "Thai Basil Chicken",
    description:
      "Stir-fried chicken with Thai basil, chilies, and jasmine rice",
    price: 19.99,
    category: "Chicken",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
    preparationTime: 15,
  },
  // Drinks
  {
    id: "meal-16",
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh mint and a hint of honey",
    price: 5.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
    preparationTime: 3,
  },
  {
    id: "meal-17",
    name: "Mango Smoothie",
    description: "Creamy blend of fresh mango, yogurt, and a touch of vanilla",
    price: 7.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop",
    preparationTime: 5,
  },
  {
    id: "meal-18",
    name: "Iced Coffee",
    description: "Cold brew coffee served over ice with your choice of milk",
    price: 4.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    preparationTime: 2,
  },
  {
    id: "meal-19",
    name: "Sparkling Water",
    description: "Premium sparkling mineral water with lime wedge",
    price: 3.99,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop",
    preparationTime: 1,
  },
];
