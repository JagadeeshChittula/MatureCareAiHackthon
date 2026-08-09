# MatruCare AI — National Hackathon Registration Portal

> Official Assignment Brief Solution for **MatruCare AI Internship Programme — Full Stack Developer Track**.

A fully functional, high-performance **Hackathon Registration Portal** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) strictly in **JavaScript** with **Tailwind CSS**. Features automated 6-digit OTP identity verification, JWT authentication, dynamic team member generation (1-5 members), and Nodemailer email integrations dispatched from `matrucareai@gmail.com`.

---

## 🌟 Key Features

- 🔐 **Secure Authentication**: Password hashing using `bcryptjs`, JWT authorization guards for protected routes, and session persistence.
- 📧 **Nodemailer OTP Verification**: Custom 6-digit OTP generator with 10-minute expiry time limit and single-use invalidation.
- 📬 **Automated Email Notifications**: Dispatches HTML email templates for OTP verification and Hackathon Registration receipts from `matrucareai@gmail.com`.
- 👥 **Dynamic Team Registration**: Dynamic entry fields generated dynamically based on selected Team Size (1 to 5 members).
- 📊 **Participant Dashboard**: Protected user area displaying live registration status, team composition, project assets (PPT, prototype, demo video links), and option to manage/delete entry.
- 🎨 **Modern Aesthetics**: Built with an ultra-clean glassmorphism dark theme, gradient visual hierarchy, micro-animations, and 100% mobile responsiveness.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) + Tailwind CSS | Interactive UI, Routing & Form Validation (Pure JavaScript, No TS) |
| **Backend** | Node.js + Express.js | REST API, Auth Guard Middleware & Business Logic |
| **Database** | MongoDB + Mongoose | Data Persistence & Schemas (With MongoMemoryServer Fallback) |
| **Auth** | JWT (JSON Web Tokens) + bcryptjs | Secure JWT Token Session & Password Hashing |
| **Email** | Nodemailer (`matrucareai@gmail.com`) | OTP Verification & Registration Confirmation Emails |
| **OTP** | Custom 6-Digit Numeric Generator | Time-limited 10-minute Email Verification |

---

## 📂 Clean Directory & Folder Structure

```
MatruCare AI/
├── client/                      # React Frontend (Vite + JavaScript + Tailwind CSS)
│   ├── src/
│   │   ├── components/          # Reusable components (Navbar, Footer, ProtectedRoute, Toast)
│   │   ├── context/             # AuthContext (JWT & session state)
│   │   ├── pages/               # Pages (Home, About, Signup, OtpVerify, Login, Dashboard, Registration, Contact)
│   │   ├── services/            # Axios API client (api.js)
│   │   ├── App.jsx              # Router & Layout configuration
│   │   ├── index.css            # Tailwind directives & glassmorphism theme
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                      # Node.js + Express.js Backend
│   ├── config/                  # DB (db.js) & Nodemailer (nodemailer.js)
│   ├── controllers/             # Handlers (authController, hackathonController, contactController)
│   ├── middleware/              # JWT auth guard (authMiddleware.js)
│   ├── models/                  # Mongoose Schemas (User, Registration, Contact)
│   ├── routes/                  # Express endpoints (authRoutes, hackathonRoutes, contactRoutes)
│   ├── utils/                   # OTP generator & HTML Email Templates
│   ├── .env                     # Server environment secrets
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Express app entry point
└── README.md                    # Project Documentation
```

---

## ⚙️ Environment Variables Guide

### Backend Secrets (`/server/.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/matrucare_hackathon
JWT_SECRET=matrucare_ai_super_secret_jwt_key_2026
EMAIL_USER=matrucareai@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
```

> **Note on Nodemailer Setup**: Enable **Gmail App Passwords** in Google Account Security for `matrucareai@gmail.com` and set `EMAIL_PASS`. If `EMAIL_PASS` is not provided in development mode, the server uses a built-in preview logger that outputs generated OTPs and email contents directly to the server console for zero-config testing!

---

## 🚀 Quick Start & Installation

### 1. Clone & Setup Backend Server
```bash
cd server
npm install
npm run dev
```
*(Server will start on `http://localhost:5000`)*

### 2. Setup Frontend Client
```bash
cd client
npm install
npm run dev
```
*(Client app will open on `http://localhost:5173`)*

---

## 📡 REST API Documentation

### Authentication & User Endpoints (`/api/auth` & `/api`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Public | Register new user & email 6-digit OTP |
| `POST` | `/api/auth/verify-otp` | Public | Verify 6-digit OTP code & activate account |
| `POST` | `/api/auth/resend-otp` | Public | Resend fresh 6-digit OTP code |
| `POST` | `/api/auth/login` | Public | Authenticate email/password & return JWT token |
| `GET` | `/api/user/me` | Protected | Fetch current logged-in user profile |
| `PUT` | `/api/user/update` | Protected | Update user profile details |

### Hackathon Entry Endpoints (`/api/hackathon`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/hackathon/register` | Protected | Submit Hackathon registration & trigger confirmation email |
| `GET` | `/api/hackathon/my-entry` | Protected | Fetch logged-in user's hackathon registration details |
| `DELETE`| `/api/hackathon/:id` | Protected | Delete existing hackathon registration entry |

### Contact Endpoint (`/api/contact`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Public | Submit contact form message to `matrucareai@gmail.com` |

---

## 🔒 Security & Rules Compliance

- **Sender Identity**: Email templates exclusively use `MatruCare AI` as sender name and `matrucareai@gmail.com` as from address.
- **Route Guarding**: All routes except Home, Login, Signup are protected via JWT middleware guards.
- **Password Protection**: Passwords are standard-hashed using `bcryptjs` (salt rounds: 10).
- **OTP Expiration**: OTPs automatically expire after 10 minutes and are invalidated upon single-use verification.

---

&copy; 2026 MatruCare AI Internship Programme. All rights reserved.
