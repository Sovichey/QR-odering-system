# Firebase Setup Guide

## ✅ Completed Setup

Your application is now configured to use Firebase! Here's what's been set up:

### Files Created/Updated

1. **`lib/firebase.ts`** - Firebase initialization with Firestore and Auth
2. **`context/RestaurantContext.tsx`** - Updated to use Firestore for real-time orders
3. **`.env.local.example`** - Template for environment variables

### Real-time Features Enabled

- ✅ Orders saved to Firestore (database)
- ✅ Real-time order status updates (Pending → Preparing → Completed)
- ✅ Live order listeners across all views
- ✅ Order operations sync with database

---

## 🔧 Required Firebase Setup

### 1. Enable Firestore Database

Go to **Firebase Console > Firestore Database**:

1. Click "Create database"
2. Select "Start in production mode"
3. Choose region: `nam5` (us-central1) or closest to you
4. Click "Create"

### 2. Set Firestore Security Rules

Go to **Firestore > Rules** and replace with:

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

Click "Publish"

### 3. Create Collections

In Firestore, create these collections:

#### **orders** collection

No initial documents needed (will be auto-created when first order is placed)

**Fields structure:**

```
{
  tableNumber: number
  items: [{
    mealId: string
    mealName: string
    quantity: number
    price: number
  }]
  totalPrice: number
  status: "Pending" | "Preparing" | "Completed"
  note: string (optional)
  createdAt: timestamp
  completedAt: timestamp (optional)
}
```

#### **meals** collection (optional - for seeding)

Add your meal data here if you want to fetch from Firestore instead of mockMeals

---

## 📝 Environment Variables

1. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Your Firebase config is already in `.env.local`
   (or update if needed from your Firebase Console)

---

## 🚀 Start Using Firebase

1. **Place an order** on the customer view
2. **Kitchen view** will show orders in real-time
3. **Status changes** sync instantly across all clients
4. **Completed orders** move to history automatically

---

## 🔍 Debugging

Check Firestore in Console to see orders:

- Firebase Console > Firestore Database > Collections > orders

---

## ⚙️ Future Enhancements

- [ ] Add meals collection and sync from Firestore
- [ ] Add Firebase Authentication for staff login
- [ ] Add order history (move completed orders to archive)
- [ ] Add analytics dashboard with real-time metrics
- [ ] Add email notifications on order status

---

## 📞 Troubleshooting

**"Failed to get document" error?**

- Check Firestore rules are published
- Verify `orders` collection exists

**No real-time updates?**

- Check browser console for errors
- Ensure Firestore listener is connected (check Network tab)
- Verify security rules allow `read`

**Orders not appearing?**

- Check Firestore Database in Console
- Verify order data structure matches expected fields
- Check browser console for errors
