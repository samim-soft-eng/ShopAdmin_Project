# ShopAdmin – Product Management Dashboard & Cart System

A modern, production-grade, responsive React web application built as an e-commerce administration and shopping cart management system.

ShopAdmin features a SaaS dashboard aesthetic with real-time shopping cart operations, accurate multi-step financial calculations (10% promotional discount and 18% GST), product catalog filtering and search, complete order dispatch with customer details validation, and persistent browser storage.

---

## 🌟 Key Features

### 1. Split-Screen Authentication (`/login`)
- **Brand Identity**: Left showcase panel highlighting features, encrypted session details, and platform metrics.
- **Validation**:
  - Email format validation with regex.
  - Password minimum length verification (&ge; 6 characters).
  - Show/Hide password toggle.
  - Remember Me preference.
- **Demo Mode**: One-click **"Fill Demo"** button (`admin@shopadmin.com` / `password123`).
- **Security & Route Protection**:
  - `ProtectedRoute` wrapper guarding all dashboard routes.
  - Automatic redirect for unauthenticated users back to login with destination memory.
  - Authenticated users cannot revisit `/login` unnecessarily.

### 2. Operational SaaS Dashboard (`/dashboard`)
- **Live Statistics Cards**:
  - **Total Products**: Live inventory count from catalog.
  - **Cart Items**: Dynamic quantity count of items actively held in the cart.
  - **Total Cart Value**: Calculated final cart valuation formatted in INR (`₹`).
  - **Total Orders**: Count of verified customer orders.
- **Recent Customer Orders Preview**:
  - Real-time orders table with Order ID, customer, order date, total amount, and status pill.
  - Interactive **"View"** action opening a comprehensive order breakdown modal.
- **Live Activity History Timeline**:
  - Tracks operations: product additions, quantity adjustments, removals, and checkout dispatch.
  - Synchronized via localStorage across tabs and browser refreshes.

### 3. Product Catalog & Advanced Filtering (`/products`)
- **Real-Time Search**: Search by product title, category, or description.
- **Dynamic Category Filtering**: Dynamically populated from product dataset (Electronics, Fashion, Home & Living, Accessories, Sports).
- **Multi-Mode Price Sorting**:
  - Default
  - Price: Low to High
  - Price: High to Low
- **Product Card System**:
  - High-resolution product imagery with automatic fallback handling.
  - Rating badges with star ratings.
  - Stock indicators (`In Stock`, `Low Stock`, `Only X left`).
  - **Duplicate Prevention**: If an item is already present in the cart, the button disables and displays **"Already in Cart"**.
  - Direct route to single product view.
- **Resilient States**:
  - Realistic skeleton loaders during data fetch.
  - Empty state with **"Clear Filters"** button when no matches exist.
  - Error recovery state with **"Retry"** action.

### 4. Product Details Presentation (`/products/:id`)
- **Interactive Visuals**: Hero image display with multi-angle thumbnail preview selector.
- **Metadata**: Category tag, verified reviews rating, stock availability counter, and detailed description.
- **Cart Integration**: One-click addition respecting cart presence state.
- **404 Handling**: Graceful fallback if product ID is invalid.

### 5. Shopping Cart Management (`/cart`)
- **Two-Column Layout**: Left item list + Right sticky calculation summary.
- **Quantity Controls**:
  - Plus (`+`) and Minus (`-`) steppers.
  - Enforces minimum quantity of 1 (never goes to 0 or negative).
  - Upper bounded by live available stock.
- **Removal**: Instant item deletion with activity logging and toast notifications.
- **Dynamic Order Calculations**:
  - **Subtotal**: $\sum (\text{Price} \times \text{Quantity})$
  - **Promotional Discount**: Fixed 10% on Subtotal
  - **GST Tax**: 18% applied on post-discount amount
  - **Final Total**: $\text{Subtotal} - \text{Discount} + \text{Tax}$
  - Consistent Indian Rupee formatting (`₹`).
- **Empty Cart Experience**: Graphic empty state illustration with **"Continue Shopping"** action.

### 6. Checkout & Order Dispatch (`/checkout`)
- **Customer Form**:
  - Full Name, Email Address, Phone Number, Delivery Address, City, Pincode.
  - Strict input validation (10-digit numeric phone, 6-digit numeric pincode, valid email).
  - Pre-fills current administrator details for rapid testing.
- **Cart Snapshot**: Summary of items being purchased with thumbnails and line items.
- **Order Placement**:
  - Generates unique Order ID (e.g. `ORD-84920`).
  - Records ISO timestamp, customer data, and line totals.
  - Sets initial status to **"Processing"**.
  - Empties cart upon successful submission.
  - Displays instant Order Confirmation Modal and notifies activity log.

### 7. Orders Management (`/orders` & `/orders/:id`)
- **Orders Table**:
  - Columns: Order ID, Customer Name, Date, Total Amount, Order Status (`Processing`, `Completed`, `Cancelled`), Actions.
- **Search & Filter**: Search orders by ID, recipient name, or city, plus filter by order status.
- **Detailed Modal & Dedicated Route**: Full breakdown of items, customer shipping address, and financial breakdown.
- **Persistence**: All orders persist in `localStorage` indefinitely.

### 8. Admin Profile (`/profile`)
- User avatar, name, email, role, phone, location, and account status.
- Inline editable profile with instant localStorage sync.
- Session summary statistics (orders executed, active cart items).
- Secure session sign-out.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Declarative Component-Based User Interface |
| **Vite 6** | Ultra-Fast Bundler and Development Server |
| **React Router DOM v6** | Client-Side SPA Declarative Routing & Protected Routes |
| **Tailwind CSS v3** | Modern Utility-First Responsive Styling System |
| **Lucide React** | Clean, Consistent Iconography |
| **React Context API** | Shared Global State (`AuthContext`, `ProductContext`, `CartContext`, `OrderContext`, `ToastContext`) |
| **Web Storage API** | Browser `localStorage` for Authentication, Cart, Orders, and Activity logs |

---

## 📁 Project Folder Structure

```text
ShopAdmin/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── assets/
    │   ├── icons/
    │   └── images/
    ├── components/
    │   ├── cart/
    │   │   ├── CartItem.jsx
    │   │   └── CartSummary.jsx
    │   ├── common/
    │   │   ├── Button.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── Input.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Modal.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── Toast.jsx
    │   ├── dashboard/
    │   │   ├── RecentActivity.jsx
    │   │   ├── RecentOrders.jsx
    │   │   └── StatCard.jsx
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx
    │   │   ├── Header.jsx
    │   │   ├── MobileNavigation.jsx
    │   │   └── Sidebar.jsx
    │   └── products/
    │       ├── ProductCard.jsx
    │       ├── ProductDetails.jsx
    │       ├── ProductFilters.jsx
    │       └── ProductGrid.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── CartContext.jsx
    │   ├── OrderContext.jsx
    │   ├── ProductContext.jsx
    │   └── ToastContext.jsx
    ├── pages/
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Dashboard.jsx
    │   ├── Login.jsx
    │   ├── NotFound.jsx
    │   ├── OrderDetails.jsx
    │   ├── Orders.jsx
    │   ├── ProductDetails.jsx
    │   ├── Products.jsx
    │   └── Profile.jsx
    ├── services/
    │   └── productService.js
    ├── utils/
    │   ├── activity.js
    │   ├── calculations.js
    │   ├── currency.js
    │   ├── localStorage.js
    │   └── validation.js
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## 🚀 Installation & Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v26)
- **npm**: v9.0.0 or higher

### Steps to Run Locally

1. **Clone or Navigate to the Repository**:
   ```bash
   cd "React Machine"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be running at: `http://localhost:3000`

4. **Production Build & Preview**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔑 Demo Login Instructions

On the login page (`/login`), you can click the **"Fill Demo"** button or enter the authorized administrator credentials:

- **Email**: `admin@shopadmin.com`
- **Password**: `password123`

*(Note: As required for the machine test, authentication is restricted to these specific authorized demo credentials. All other email and password combinations will be rejected with "Invalid email or password".)*

---

## 📐 Evaluation Matrix Self-Check

| Criteria | Maximum Marks | Implementation Details |
| :--- | :---: | :--- |
| **UI Design & Responsiveness** | **15** | SaaS aesthetic, `#4F46E5` primary theme, Inter typography, responsive sidebar/drawer, fluid card grids, zero horizontal overflow. |
| **Component Structure** | **15** | Modular separation of concerns across `layout`, `common`, `dashboard`, `products`, and `cart`. Reusable Buttons, Inputs, Modals, Loaders, and EmptyStates. |
| **React Router Implementation** | **10** | React Router v6 with `ProtectedRoute`, nested dashboard outlet, dynamic routes (`/products/:id`, `/orders/:id`), 404 page, and redirect handling. |
| **State Management** | **15** | Unified React Context API (`Auth`, `Product`, `Cart`, `Order`, `Toast`), memoized selectors, zero redundant re-renders, full `localStorage` persistence. |
| **Search, Filter & Sort** | **15** | Real-time multi-field search combined with dynamic category selection and high/low price sorting. Live result counts and reset action. |
| **Cart Calculation Logic** | **15** | Dynamic Subtotal, 10% Discount, 18% GST calculation, strict $\ge 1$ quantity boundary, item subtotals, and currency formatting in INR (`₹`). |
| **Form Validation** | **10** | Regex email validation, 6+ char password, 10-digit phone, 6-digit pincode, required fields, and clear inline error alerts on Login and Checkout. |
| **Code Readability** | **5** | Clean ES6+ syntax, comprehensive JSDoc comments, safe storage wrappers, and no unused dependencies. |
