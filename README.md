# 🍽️ Restaurant Ordering System

A modern, real-time restaurant ordering and management system built with Next.js, React, and Firebase. Features separate interfaces for customers to browse and order meals, staff login, and kitchen management views with live order tracking.

## Scan Poster

Use this poster for table signs, counters, or printed menus so customers can scan and open the ordering system.

<img src="public/Scan%20And%20Order.png" alt="QUICKBITE scan and order poster" width="420" />

---

## ✨ Features

- **Customer Interface**
  - Browse restaurant menu with categories
  - Add items to cart with quantity selection
  - View active orders in real-time
  - Responsive design optimized for all devices

- **Staff Management**
  - Secure staff login system
  - Real-time order notifications
  - Order status tracking (Pending → Preparing → Completed)

- **Kitchen View**
  - Real-time order queue display
  - Update order status
  - Live synchronization across devices

- **Admin Dashboard**
  - Manage meals and categories
  - View order analytics
  - System configuration

- **Real-time Updates**
  - Firebase Firestore for live data synchronization
  - Instant order status updates across all views
  - WebSocket-like experience without polling

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible component primitives
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - Real-time cloud database
- **Authentication**: Firebase Authentication
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful SVG icons
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notification library
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (install with `npm install -g pnpm`)
- **Firebase Project** (create free at [firebase.google.com](https://firebase.google.com))
- **Vercel Account** (optional, for deployment - sign up at [vercel.com](https://vercel.com))

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd restaurant-ordering-system
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing one)
3. Enable Firestore Database:
   - Go to **Firestore Database**
   - Click **Create database**
   - Select **Production mode**
   - Choose your preferred region
   - Click **Create**

4. Get your Firebase credentials:
   - Go to **Project Settings** (gear icon)
   - Click **Service Accounts**
   - Copy your credentials or create a web app to get the config

5. Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

6. Fill in your Firebase credentials in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Configure Firestore Rules

In Firebase Console, go to **Firestore > Rules** and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{document=**} {
      allow read, write: if true;
    }
    match /meals/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

> **Note**: For production, implement proper authentication and authorization rules.

---

## 💻 Development

### Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The page will auto-refresh as you make changes.

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

---

## 📁 Project Structure

```
restaurant-ordering-system/
├── app/                           # Next.js app directory
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page/main entry
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── RestaurantSystem.tsx      # Main app component
│   ├── TableNumberInput.tsx      # Table selection
│   ├── theme-provider.tsx        # Theme configuration
│   ├── customer/                 # Customer interface
│   │   ├── MealCard.tsx
│   │   ├── MealGrid.tsx
│   │   ├── MenuCategories.tsx
│   │   ├── MenuHeader.tsx
│   │   ├── CartModal.tsx
│   │   └── ActiveOrders.tsx
│   ├── staff/                    # Staff interface
│   │   └── StaffLoginModal.tsx
│   ├── views/                    # Full-page views
│   │   ├── CustomerMenuView.tsx
│   │   ├── KitchenView.tsx
│   │   └── AdminDashboard.tsx
│   └── ui/                       # Reusable UI components (Radix UI)
├── context/                      # React Context
│   └── RestaurantContext.tsx     # Global app state & Firebase logic
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                          # Utilities & configuration
│   ├── firebase.ts               # Firebase initialization
│   ├── types.ts                  # TypeScript types
│   ├── utils.ts                  # Helper utilities
│   ├── data/
│   │   ├── mockMeals.ts
│   │   └── mockOrders.ts
│   └── utils/
│       └── helpers.ts
├── public/                       # Static assets
├── styles/                       # Global styles
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── components.json               # Shadcn/ui config
└── README.md
```

---

## 🔒 Environment Variables

The application uses the following environment variables (all public for Firebase):

| Variable                                   | Description                  |
| ------------------------------------------ | ---------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase API key             |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Firebase project ID          |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Firebase app ID              |

> **Security Note**: The `NEXT_PUBLIC_` prefix means these variables are exposed in the browser. Always secure your Firestore with proper security rules, not just environment variables.

---


## 🧪 Testing

### Build Locally

Before deploying, test the production build locally:

```bash
pnpm build
pnpm start
```

Then visit [http://localhost:3000](http://localhost:3000)

---

## 📱 Features Walkthrough

### Customer View

- Enter table number to get started
- Browse menu items by category
- Add items to cart and view your active orders
- Real-time order status updates

### Staff Login

- Secure staff portal with login
- View all orders
- Update order statuses

### Kitchen View

- See all pending and preparing orders
- Mark orders as completed
- Real-time notification system

### Admin Dashboard

- Manage menu items and categories
- View order analytics
- System configuration options

---

## 🐛 Troubleshooting

### Issue: "Firebase is not initialized"

**Solution**: Ensure `.env.local` is properly configured with all Firebase credentials.

### Issue: "CORS error when accessing Firestore"

**Solution**: Check your Firestore security rules and ensure they allow read/write access as configured in the rules above.

### Issue: "Environment variables not loading"

**Solution**:

- Restart the development server after changing `.env.local`
- Ensure variables use the `NEXT_PUBLIC_` prefix for browser access

### Issue: "Build fails on Vercel"

**Solution**:

- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Node.js version compatibility (18.17+)
- Run `pnpm build` locally to identify issues

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Happy ordering! 🍕🍔🍜**
