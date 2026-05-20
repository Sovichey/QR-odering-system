# QUICKBITE Restaurant Ordering System

QUICKBITE is a restaurant ordering and order management web application built for table-service restaurants. Customers can scan a QR poster, choose their table number, browse the menu, place orders, and follow order progress in real time. Staff can access separate kitchen and admin views to manage active orders and monitor restaurant activity.

## Project Overview

The project focuses on three main workflows:

- Customer ordering from a mobile-friendly menu
- Kitchen order handling with live status updates
- Admin visibility into revenue, active tables, completed orders, and order history

It is designed as a single-page restaurant system with role-based views. Customers use the menu view, kitchen staff use the kitchen queue, and administrators use the dashboard.

## Scan Poster

The repository includes a scan-and-order poster asset that can be used for table signs, counters, or printed menus.

<img src="public/Scan%20And%20Order.png" alt="QUICKBITE scan and order poster" width="420" />

## Main Features

### Customer Menu

- Table number entry before ordering
- Categorized menu browsing
- Meal cards with images, descriptions, prices, and preparation time
- Cart management with quantity updates
- Optional order notes for special instructions
- Active order tracking
- Mobile bottom navigation for menu, cart, orders, and staff access

### Kitchen View

- Real-time active order queue
- Pending and preparing order counters
- Grid and list layouts for desktop kitchen screens
- Order cards grouped by table number
- Special instruction display
- Status flow from `Pending` to `Preparing` to `Completed`

### Admin Dashboard

- Restaurant KPI cards for revenue, active tables, completed orders, and average prep time
- Combined order history table
- Status badges for pending, preparing, and completed orders
- Responsive dashboard layout for desktop and mobile use

### Staff Access

- Staff login modal with role selection
- Kitchen role for order preparation
- Admin role for analytics and order history
- Demo PIN-based access for project presentation and testing

## Data Flow

The app keeps customer cart and selected table data in browser storage so the ordering session can continue across page refreshes. Orders are stored in Firestore and synchronized through real-time listeners, allowing customer, kitchen, and admin views to stay updated without manual refreshes.

Menu items currently come from local mock meal data, while live orders are read from and written to the `orders` collection.

## Order Lifecycle

1. A customer selects a table and adds meals to the cart.
2. The customer places an order with optional notes.
3. The order appears in the kitchen view as `Pending`.
4. Kitchen staff start the order, changing it to `Preparing`.
5. Kitchen staff complete the order, changing it to `Completed`.
6. The admin dashboard includes the order in restaurant metrics and order history.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Firebase Firestore
- Lucide React icons
- Sonner notifications
- Vercel Analytics

## Project Structure

```text
app/                         Next.js app entry, layout, and global styles
components/                  Application and UI components
components/customer/         Customer menu, cart, categories, and active orders
components/staff/            Staff login flow
components/views/            Customer, kitchen, and admin screens
components/ui/               Shared reusable UI components
context/                     Restaurant state, cart logic, and order actions
hooks/                       Shared React hooks
lib/                         Firebase config, types, helpers, and mock data
public/                      Static assets, logo, QR poster, and images
styles/                      Additional global styling
```

## Key Files

- `components/RestaurantSystem.tsx` controls the main view switching between customer, kitchen, and admin experiences.
- `context/RestaurantContext.tsx` manages menu data, cart state, order placement, order updates, and real-time Firestore syncing.
- `components/views/CustomerMenuView.tsx` renders the customer ordering interface.
- `components/views/KitchenView.tsx` renders the kitchen order queue.
- `components/views/AdminDashboard.tsx` renders restaurant metrics and order history.
- `components/staff/StaffLoginModal.tsx` handles role selection and staff PIN login.

## Project Purpose

QUICKBITE demonstrates a practical restaurant ordering workflow where customers can order from their own device and staff can manage orders instantly from dedicated views. It is suitable for showcasing real-time ordering, role-based interfaces, responsive UI design, and restaurant operations management in a modern web app.
