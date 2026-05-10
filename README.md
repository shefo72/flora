# Flora Store — Botanical E-commerce Platform 🌿

A modern Next.js storefront for a botanical shop with customer shopping, protected routes, and a dedicated admin dashboard. Flora Store blends elegant product browsing, role-based authentication, cart checkout, and admin product/order management into a polished experience.

---

## 🌼 Project Description

Flora Store is an e-commerce platform built for a floral boutique. It offers customer-facing pages for browsing products, searching by category, adding items to cart, and completing checkout. The application also includes a secure admin dashboard where administrators can manage products, perform full product CRUD, and view/manage recent orders.

---

## 🧰 Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Redux Toolkit**
- **React Hook Form**
- **Zod**
- **Axios**
- **Lucide React**
- **shadcn UI**
- **ESLint**

---

## ✨ Key Features

- **Customer Authentication** with login and signup flows
- **Role-Based Access Control** for users and admins
- **Protected Routes** for cart, checkout, and admin pages
- **Product Catalog** with search and category filtering
- **Shopping Cart** with quantity updates and item removal
- **Checkout Flow** with shipping and payment form handling
- **Remote API Integration** via `NEXT_PUBLIC_API_URL`
- **Responsive UI** across desktop and mobile
- **Redux state management** for cart and authentication state

---

## 🛠️ Admin Dashboard Features

The admin dashboard provides a polished management experience for the botanical store:

- Full **product management** with:
  - **Add Product**
  - **Edit Product**
  - **Delete Product**
- **Orders management** for recent order tracking, status updates, and order removal
- Secure admin-only access using `AdminGuard`
- Sidebar navigation for easy dashboard flow

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm

### Install dependencies

```bash
npm install
```

### Environment

Create a `.env` file in the project root with the API endpoint:

```env
NEXT_PUBLIC_API_URL=https://floraapi-production-e891.up.railway.app/api
```

### Run the development server

```bash
npm run dev
```

Open your browser at: `http://localhost:3000`

### Build for production

```bash
npm run build
npm run start
```

---

## 📁 Folder Structure Overview

```text
.
├── app/
│   ├── (main)/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── login/
│   │   ├── products/
│   │   └── signup/
│   ├── (dashboard)/
│   └── layout.tsx
├── components/
│   ├── Guards/
│   ├── admin/
│   ├── home/
│   ├── providers/
│   └── ui/
├── data/
├── lib/
├── schema/
├── server/
├── store/
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💡 Notes

- Admin pages are protected and only available to authenticated users with the admin role.
- The storefront relies on an external API for products, authentication, signup, cart, and checkout.
- Forms use validation with **React Hook Form** and **Zod** for a consistent user experience.
- Tailwind CSS and shadcn UI patterns drive the app’s visual design.
