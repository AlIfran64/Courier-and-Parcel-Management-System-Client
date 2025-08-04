# GoQuick - Courier and Parcel Management System

[Live Demo](https://goquick-4b7f4.web.app/)

---

## Project Overview

GoQuick is a MERN stack application designed to streamline courier and parcel management for logistics companies. It allows customers to book parcels, delivery agents to manage and update delivery statuses, and admins to oversee the entire operation via a comprehensive dashboard.

---

## Features

### Customer
- Register and login with secure JWT authentication
- Book parcel pickups with details like pickup & delivery address, parcel size/type, and payment method (COD or prepaid)
- View booking history and parcel delivery statuses
- Track parcels in real-time on an interactive map

### Delivery Agent
- View assigned parcels with details
- Update parcel status: Picked Up, In Transit, Delivered, or Failed
- Access optimized delivery routes displayed via Leaflet maps

### Admin
- Dashboard showing key parcel metrics: daily bookings, failed deliveries, COD amounts
- Assign delivery agents to parcels
- Manage all users and parcel bookings
- Export reports in CSV or PDF formats
- Role-based access control to protect API routes

### Backend
- RESTful APIs for authentication, parcel CRUD operations, agent assignment, parcel status updates, analytics, and reporting
- Real-time updates with Socket.IO for parcel status changes and tracking
- Geolocation tracking using coordinate data
- Secure role-based middleware with JWT authentication

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Socket.IO
- **Frontend:** React.js, Leaflet.js (for maps), Socket.IO-client
- **Other Tools:** bcrypt, dotenv, cors

---

