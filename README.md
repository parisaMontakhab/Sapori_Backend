# 🍕 Sapori API

A production-ready RESTful API for an Italian Food Delivery platform built with **Node.js**, **Express.js**, and **MongoDB**.

This project demonstrates authentication, authorization, secure payments with Stripe, image uploads, email notifications, and a complete order & review workflow.

---

## 🚀 Features

### 👤 Authentication & Authorization

- User signup & login
- JWT Authentication
- Password reset via email
- Role-based authorization (User / Admin)
- Update password
- Update profile
- Soft delete account

---

### 🍕 Products

- CRUD operations
- Product categories
- Product image upload
- Image processing with Sharp
- Average rating & rating count

---

### ⭐ Reviews

- Create, update and delete reviews
- One review per user per product
- Average product rating calculation
- **Only users who purchased a product can review it**

---

### 🛒 Orders

- Create order
- View user orders
- View order details
- Admin order management
- Automatic total price calculation

---

### 💳 Stripe Payments

- Stripe Checkout Session
- Stripe Webhook integration
- Secure payment verification
- Automatic order update after successful payment

---

### 📧 Email

- Welcome email
- Password reset email
- Beautiful HTML emails using Pug templates

---

### 🔒 Security

- Helmet
- CORS
- HPP
- Rate Limiting
- JWT Authentication
- Password hashing with bcrypt

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcryptjs

### Payment

- Stripe Checkout
- Stripe Webhooks

### Image Upload

- Multer
- Sharp

### Email

- Nodemailer
- Pug

### Security

- Helmet
- Express Rate Limit
- HPP

---

## 📂 Project Structure

```
src/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── public/
├── views/
├── config/
│
├── app.js
└── server.js
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/sapori-backend.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
DATABASE=
DATABASE_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=
JWT_COOKIE_EXPIRES_IN=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EMAIL_FROM=
```

Run the development server

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

```
POST   /api/v1/users/signup
POST   /api/v1/users/login
GET    /api/v1/users/logout

POST   /api/v1/users/forgotPassword
PATCH  /api/v1/users/resetPassword/:token
PATCH  /api/v1/users/updateMyPassword
PATCH  /api/v1/users/updateMe
DELETE /api/v1/users/deleteMe
```

---

### Products

```
GET    /api/v1/products
GET    /api/v1/products/:id

POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
```

---

### Orders

```
POST   /api/v1/orders/my-orders
GET    /api/v1/orders/my-orders
GET    /api/v1/orders/my-orders/:id
```

---

### Payments

```
GET    /api/v1/payments/checkout-session/:orderId

POST   /api/v1/payments/webhook
```

---

### Reviews

```
GET    /api/v1/products/:productId/reviews

POST   /api/v1/products/:productId/reviews

PATCH  /api/v1/reviews/:id

DELETE /api/v1/reviews/:id
```

---

## 🔒 Business Rules

✔ Only authenticated users can place orders.

✔ Only the owner of an order can pay for it.

✔ Orders are updated automatically after Stripe confirms payment.

✔ Only users who have purchased a product can review it.

✔ A user can submit only one review per product.

---

## 🧪 Testing

The API has been tested using:

- Postman
- Stripe Sandbox
- MongoDB Compass

---

## 🚀 Future Improvements

- Shopping Cart
- Coupons & Discounts
- Delivery Tracking
- Search & Filtering
- Pagination
- Admin Dashboard
- Frontend Integration (Next.js)

---

## 👩‍💻 Author

**Parisa Montakhabi**

Frontend & Full Stack Developer

GitHub:
https://github.com/parisaMontakhab

---

## 📄 License

This project is created for educational and portfolio purposes.
