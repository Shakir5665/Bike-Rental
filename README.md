# EcoRide - Bike Rental System

A premium, full-stack bike rental platform built with .NET 8, React, and PostgreSQL.

## 🚀 Features
- **Modern UI**: Stunning dark-mode design with Emerald/Slate/Sky palette.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Real-time Costing**: Live calculation based on pre-selected hours.
- **Admin Dashboard**: Manage your bike fleet and view system-wide rentals.
- **Framer Motion**: Smooth animations and transitions.

## 🛠️ Technology Stack
- **Backend**: .NET 8 Web API (Minimal API & Controllers)
- **Database**: PostgreSQL with Entity Framework Core
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

## 🏗️ Getting Started

### 1. Database (PostgreSQL)
We provide a `docker-compose.yml` for easy setup.
```bash
docker-compose up -d
```
*If you have PostgreSQL installed locally, ensure the connection string in `Backend/BikeRental.Api/appsettings.json` matches your credentials.*

### 2. Backend (.NET 8)
1. Navigate to the backend directory:
   ```bash
   cd BikeRentalSystem/Backend/BikeRental.Api
   ```
2. Restore and run migrations:
   ```bash
   dotnet ef database update
   ```
3. Start the API:
   ```bash
   dotnet run
   ```
   *The API will run on http://localhost:5000 (standard for this setup).*

### 3. Frontend (React)
1. Navigate to the frontend directory:
   ```bash
   cd BikeRentalSystem/Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Admin Access
The admin routes are protected by a simple API key header for demo purposes.
- **Admin Page**: `/admin`
- **X-API-Key**: `admin123` (Hardcoded in `AdminDashboard.jsx` and `AdminController.cs`)

---

## 🚲 Business Rules
1. **Duration**: Maximum rental duration is 8 hours.
2. **Pricing**: `HourlyRate` (per bike) × `Hours` (selected at rental).
3. **Availability**: Only "Available" bikes can be rented. Status changes to "Rented" automatically.
4. **Return**: Returning a bike updates its status to "Available" and sets the `EndTime`.

## 📸 Sample Data
The system is seeded with 6 premium bikes:
- Mountain Pro X ($8/hr)
- Trail Blazer ($8/hr)
- Road King ($10/hr)
- Speedster ($10/hr)
- E-Glide 3000 ($15/hr)
- City Cruiser ($6/hr)
