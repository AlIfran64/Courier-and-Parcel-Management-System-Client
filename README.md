# 🚀 GoQuick - Courier and Parcel Management System

Welcome to **GoQuick**, a full-featured MERN stack application designed to streamline courier and parcel management for logistics companies, providing a seamless experience for customers, delivery agents, and administrators.

## 🔗 Live Demo
- 🌐 [https://goquick-4b7f4.web.app/](https://goquick-4b7f4.web.app/)

---

## Project Overview

GoQuick simplifies courier and parcel operations by enabling customers to book parcels, delivery agents to update and track deliveries, and admins to manage all aspects via a comprehensive dashboard. This system improves efficiency, transparency, and communication across all user roles.

---

## Key Features

### Customer
- Secure JWT-based registration and login
- Parcel booking with pickup and delivery addresses, parcel size and type, and payment method (COD or prepaid)
- Booking history and parcel delivery status views
- Real-time parcel tracking on interactive Leaflet maps

### Delivery Agent
- View assigned parcels with detailed info
- Update parcel statuses: Picked Up, In Transit, Delivered, or Failed
- Optimized delivery routes displayed on Leaflet maps

### Admin
- Dashboard with key metrics: daily bookings, failed deliveries, COD payments, and so on
- Assign delivery agents to parcels efficiently
- Manage users and all parcel bookings
- Export reports in PDF format
- Role-based access control with JWT middleware securing API routes

### Additional Features
- Email notifications for customers
- Multi-language support (English & Bengali)

### Backend
- RESTful APIs for authentication, CRUD operations, agent assignments, parcel tracking, analytics, and reporting
- Real-time parcel status updates using Socket.IO
- Geolocation and coordinate-based tracking
- Secure role-based middleware protecting routes

---

## 🚀 Tech Stack

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT Authentication**
- **Socket.IO** for real-time communication
- **Nodemailer** for email notifications 

### Frontend:
- **React.js**
- **JavaScript**
- **Tailwind CSS**
- **Firebase-Auth**
- **Tanstack Query**
- **i18n-react** for multi-language support
- **Leaflet.js** (interactive maps)
- **Socket.IO-client**
- **react@pdf/renderer** for export report

---

## 🔗 Additional Links

- Server-side Repository: [https://github.com/AlIfran64/Courier-and-Parcel-Management-System-Server](https://github.com/AlIfran64/Courier-and-Parcel-Management-System-Server)

---

## Admin Credentials (For Demo)

- Email: alifranrafi64@gmail.com  
- Password: 1234Asdf

---

## Client-Side Access Guide

### Setup Instructions

1. **Clone the Repository**

```
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

2. **Install dependency**
```
npm install
```

3. **Firebase Configuration**
- Create a Firebase project.
- Enable Email/Password authentication.
- Copy your Firebase config and update the environment file.

4. **Create .env.local File**
5. **Start the Development Server**
```
npm run dev
```


### User Flow

1. **Customer Registration**
- Visit the app and register using your email and password.
- After successful registration, the user is redirected to the home page.
- Customers can book parcels, view history, and track parcels.

2. **Apply as Delivery Agent**
- On the home page, customers can apply to become a delivery agent.
- This request goes to the Admin for review.

3. **Admin Access**
- Login using Admin credentials.
- Navigate to Agent Requests.
- Accept or reject delivery agent applications.
- Assign available parcels to approved agents.

4. **Delivery Agent Access**
- Once approved, the agent can log in using their credentials.
- Agents can view assigned parcels and update delivery statuses.



