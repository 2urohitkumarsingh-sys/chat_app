# Chatify App

A modern, full-stack real-time chat application featuring real-time messaging, user authentication, a dedicated Admin Dashboard, and a fluid, dark-mode focused UI.

## Features

- **Real-Time Messaging**: Built with Socket.io for instantaneous bidirectional communication.
- **User Authentication**: Secure signup and login flows powered by JWT and bcrypt.
- **Admin Dashboard**: Specialized route and panel for admins to manage users, roles, and global platform settings.
- **Media Sharing**: Image upload and management integrated with Cloudinary. (Includes double-click fullscreen preview)
- **Responsive UI**: Glassmorphic, modern dark-themed aesthetics built with Tailwind CSS & DaisyUI.
- **State Management**: Lightweight, fast state handling via Zustand.
- **Rate Limiting**: Endpoint protection powered by Arcjet.
- **Alerts & Notifications**: On-screen toast notifications via `react-hot-toast`.

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS, DaisyUI, Lucide React (icons)
- **State**: Zustand
- **Real-Time Client**: Socket.io-client
- **HTTP/Fetch**: Axios

### Backend
- **Environment**: Node.js & Express.js
- **Database**: MongoDB (via Mongoose)
- **Real-Time Server**: Socket.io
- **Auth & Security**: JSON Web Tokens (JWT), bcryptjs, cookie-parser, CORS, Arcjet (for rate limiting)
- **Media**: Cloudinary
- **Emails**: Resend

## Setup and Installation

### 1. Clone the repository

```bash
git clone <repository_url>
cd chat_app
```

### 2. Environment Variables

Create `.env` variables for your backend configuration:

**Backend (`backend/.env`)**
```env
PORT=5001
MONGODB_URI=<your_mongodb_cluster_uri>
JWT_SECRET=<your_secure_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
ARCJET_KEY=<your_arcjet_key>
```

### 3. Install Dependencies

You can install all dependencies from the root directory or manually within each folder:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 4. Running Locally

To run both the backend and frontend locally for development, open two terminal windows:

**Terminal 1 (Backend)**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm run dev
```

The application frontend will typically be accessible at `http://localhost:5173`, and the backend API at `http://localhost:5001`.

## Scripts

From the root `package.json`, you can run the following to prepare the environment for production:

- `npm run build`: Installs all dependencies for both frontend and backend, then builds the frontend for production.
- `npm start`: Starts the backend server (typically used in production).

## Helpful Links & Resources

- **Database (MongoDB Atlas)**: [mongodb.com](https://cloud.mongodb.com/)
- **UI Components (DaisyUI)**: [daisyui.com](https://daisyui.com/)
- **Security/Rate Limiting (Arcjet)**: [arcjet.com](https://app.arcjet.com/)
- **Media Hosting (Cloudinary)**: [cloudinary.com](https://console.cloudinary.com/)
- **Email Service (Resend)**: [resend.com](https://resend.com/)

---

*Thank you for using Chatify!*
