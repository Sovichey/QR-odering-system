# QUICKBITE Restaurant Ordering System

QUICKBITE is a web-based restaurant ordering system for dine-in restaurants. It lets customers order from their table using a digital menu, while kitchen staff and administrators manage orders from dedicated real-time views.

The project is built around a simple restaurant workflow: customers browse food, place an order, kitchen staff prepare it, and administrators track restaurant activity from a dashboard.

## About The Project

This system is designed to reduce manual order taking and make the ordering process faster for both customers and staff. Customers can scan a QR poster, enter their table number, select meals, add notes, and submit an order directly from their phone.

Once an order is placed, it appears in the kitchen view immediately. Staff can move orders through each status, while the admin dashboard shows a wider overview of restaurant performance and order history.

## Scan And Order Poster

The project includes a QR-style poster asset for restaurant tables, counters, or printed menus.

<img src="public/Scan%20And%20Order.png" alt="QUICKBITE scan and order poster" width="420" />

## Main Modules

### Customer Ordering

The customer side is focused on fast mobile ordering. Customers first choose their table number, then browse meals by category, add items to the cart, adjust quantities, write special instructions, and place an order.

Customer features include:

- Table number selection
- Food category filtering
- Meal cards with images, prices, descriptions, and preparation time
- Cart drawer with quantity controls
- Special order notes
- Active order tracking
- Mobile bottom navigation

### Kitchen Management

The kitchen view is made for staff who need to see incoming orders clearly and update them quickly. Orders are separated by status so staff can identify what needs to be started and what is already being prepared.

Kitchen features include:

- Live active order queue
- Pending and preparing order counters
- Table number display for every order
- Ordered item list with quantities
- Special instruction display
- Grid and list layouts on desktop
- Order status updates from `Pending` to `Preparing` to `Completed`

### Admin Dashboard

The admin dashboard gives restaurant managers a summary of current activity and completed work. It combines active and completed orders into a readable history table and displays key restaurant metrics.

Admin features include:

- Today's revenue
- Active table count
- Completed order count
- Average preparation time
- Full order history
- Status badges for each order
- Responsive dashboard layout

### Staff Access

Staff access is handled through a role-based login modal. Staff can choose either the kitchen role or admin role, then enter a PIN to open the correct view.

This project uses demo PIN access for presentation and testing purposes.

## Order Flow

1. Customer enters a table number.
2. Customer browses the menu and adds meals to the cart.
3. Customer submits the order with optional notes.
4. Kitchen receives the order as `Pending`.
5. Kitchen starts the order and marks it as `Preparing`.
6. Kitchen completes the order and marks it as `Completed`.
7. Admin dashboard updates metrics and order history.

## Data And State

QUICKBITE uses browser storage for table and cart session data, so customers do not lose their current cart during a refresh. Orders are saved in Firestore and synced in real time across customer, kitchen, and admin views.

Menu data is currently stored locally in the project as mock meal data. Order data is live and uses the Firestore `orders` collection.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Firebase Firestore
- Lucide React
- Sonner
- Vercel Analytics

## Folder Overview

```text
app/                         Main Next.js app files
components/                  Application components
components/customer/         Customer menu, cart, and order tracking
components/staff/            Staff login interface
components/views/            Customer, kitchen, and admin views
components/ui/               Shared UI components
context/                     Restaurant state and order actions
hooks/                       Reusable React hooks
lib/                         Types, helpers, Firebase config, and mock data
public/                      Images, logo, and scan poster assets
styles/                      Global style files
```

## Important Files

- `components/RestaurantSystem.tsx` handles the main view switching.
- `context/RestaurantContext.tsx` manages cart data, orders, metrics, and Firestore synchronization.
- `components/views/CustomerMenuView.tsx` contains the customer ordering screen.
- `components/views/KitchenView.tsx` contains the kitchen order queue.
- `components/views/AdminDashboard.tsx` contains metrics and order history.
- `components/staff/StaffLoginModal.tsx` contains staff role selection and PIN login.

## Project Goal

The goal of QUICKBITE is to demonstrate a practical restaurant ordering workflow with real-time order updates, clear role-based interfaces, and a responsive design that works well for customers, kitchen staff, and administrators.
