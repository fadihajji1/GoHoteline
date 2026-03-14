# GoHoteline - Hotel Reservation System

A full-stack hotel reservation and management application (clone to booking.com) built with the MERN stack (MongoDB, Express, React, Node.js). The system includes a customer-facing booking platform, an admin dashboard for hotel management, and a robust backend API.

> **Note:** This project is still in development and not yet complete.

## Project Overview

GoHoteline is a comprehensive hotel management and booking system that enables customers to search and book hotels while providing administrators with tools to manage properties, rooms, and user accounts. The application consists of three main components:

- **Client Website** - Customer-facing booking platform
- **Admin Dashboard** - Management interface for administrators
- **Backend API** - RESTful API server with database

## System Architecture

### 1. **Client Website** (`/client`)
The public-facing web application for customers to browse and book hotels.

**Technology Stack:**
- React 18 with React Router v6
- Axios for API calls
- Date range picker with react-date-range
- FontAwesome icons
- Date formatting with date-fns
- Responsive CSS styling

**Key Features:**
- Home page with featured hotels and property listings
- Hotel search and filtering
- Detailed hotel view with room information
- Hotel reservation system with date selection
- User authentication (login)
- User context for managing booking state

**Main Pages:**
- Home - Landing page with featured properties
- Hotel List - Browse all available hotels
- Hotel Details - View specific hotel information
- Login - User authentication

### 2. **Admin Dashboard** (`/admin`)
Internal management interface for hotel administrators to manage operations.

**Technology Stack:**
- React 17 with React Router v6
- Material-UI (MUI) components and Data Grid
- Recharts for data visualization
- Axios for API integration
- SASS for styling
- Dark mode support

**Key Features:**
- User management (view, add, edit user records)
- Hotel/product management
- Room management
- Dashboard with analytics and widgets
- Data tables with sorting and filtering
- Authentication with protected routes
- Dark/Light theme toggle
- Statistics and charts (featured items, recent transactions)

**Main Pages:**
- Dashboard/Home - Overview with stats and charts
- Users List - Manage user accounts
- User Details - View individual user information
- Add New User - Create new user accounts
- Products List - Manage hotels/products
- Product Details - Hotel information
- Add New Product - Create new hotel listings

### 3. **Backend API** (`/api`)
RESTful API server handling all business logic and database operations.

**Technology Stack:**
- Node.js with Express.js framework
- MongoDB with Mongoose ODM
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- Cookie Parser for session management
- CORS enabled for cross-origin requests
- Nodemon for development

**API Endpoints:**

**Authentication Routes** (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login with JWT token generation

**User Routes** (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get specific user
- `POST /` - Create new user
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

**Hotel Routes** (`/api/hotels`)
- `GET /` - Get all hotels
- `GET /featured` - Get featured hotels
- `GET /countByCity` - Get hotel count by city
- `GET /:id` - Get specific hotel
- `POST /` - Create new hotel
- `PUT /:id` - Update hotel
- `DELETE /:id` - Delete hotel

**Room Routes** (`/api/rooms`)
- `GET /` - Get all rooms
- `PUT /update/:id` - Update room availability
- `POST /` - Create new room
- `DELETE /:id` - Delete room

## Database Models

### User Model
- username (unique, required)
- email (unique, required)
- country (required)
- city (required)
- phone (required)
- password (hashed, required)
- img (profile image)
- isAdmin (boolean, default: false)
- timestamps (createdAt, updatedAt)

### Hotel Model
- name (required)
- type (required)
- city (required)
- address (required)
- distance (required)
- photos (array)
- title (required)
- description (required)
- rating (0-5)
- rooms (array of room IDs)
- cheapestPrice (required)
- featured (boolean)

### Room Model
- title (required)
- price (required)
- maxPeople (required)
- description (required)
- roomNumber (array with unavailable dates)
- timestamps (createdAt, updatedAt)

## Project Structure

```
GoHoteline/
├── admin/                          # Admin dashboard (React app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── chart/             # Chart visualization
│   │   │   ├── datatable/         # Data grid tables
│   │   │   ├── featured/          # Featured items widget
│   │   │   ├── navbar/            # Top navigation
│   │   │   ├── sidebar/           # Side navigation
│   │   │   ├── table/             # Table component
│   │   │   └── widget/            # Dashboard widgets
│   │   ├── context/
│   │   │   ├── AuthContext.js     # Auth state management
│   │   │   ├── darkModeContext.js # Dark mode state
│   │   │   └── darkModeReducer.js # Dark mode reducer
│   │   ├── pages/
│   │   │   ├── home/              # Dashboard home
│   │   │   ├── list/              # Lists view
│   │   │   ├── login/             # Admin login
│   │   │   ├── new/               # Create new items
│   │   │   └── single/            # Detailed view
│   │   ├── hooks/
│   │   │   └── useFetch.js        # Custom fetch hook
│   │   ├── App.js                 # Main app component
│   │   ├── formSource.js          # Form configuration
│   │   ├── datatablesource.js     # Table data config
│   │   └── style/
│   │       └── dark.scss          # Dark theme styles
│   ├── package.json
│   └── public/
│
├── client/                         # Customer booking platform (React app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── featured/          # Featured hotels
│   │   │   ├── featuredProperties/# Featured properties
│   │   │   ├── footer/            # Footer
│   │   │   ├── header/            # Header/navbar
│   │   │   ├── mailList/          # Newsletter signup
│   │   │   ├── navbar/            # Navigation bar
│   │   │   ├── propertyList/      # Property listings
│   │   │   ├── reserve/           # Booking form
│   │   │   └── searchItem/        # Search results item
│   │   ├── context/
│   │   │   ├── AuthContext.js     # Auth state
│   │   │   └── SearchContext.js   # Search/booking state
│   │   ├── hooks/
│   │   │   └── useFetch.js        # Custom fetch hook
│   │   ├── pages/
│   │   │   ├── home/              # Home page
│   │   │   ├── hotel/             # Hotel details
│   │   │   ├── list/              # Hotel list/search
│   │   │   └── login/             # User login
│   │   ├── App.js                 # Main app component
│   │   └── index.js               # React root
│   ├── package.json
│   └── public/
│
├── api/                            # Backend server (Express/Node.js)
│   ├── controllers/
│   │   ├── auth.js                # Authentication logic
│   │   ├── hotel.js               # Hotel controller
│   │   ├── room.js                # Room controller
│   │   └── user.js                # User management
│   ├── models/
│   │   ├── Hotel.js               # Hotel schema
│   │   ├── Room.js                # Room schema
│   │   └── User.js                # User schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   ├── hotels.js              # Hotel endpoints
│   │   ├── rooms.js               # Room endpoints
│   │   └── users.js               # User endpoints
│   ├── utils/
│   │   ├── error.js               # Error handling
│   │   └── verifyToken.js         # JWT verification
│   ├── index.js                   # Server entry point
│   └── package.json
│
└── README.md                       # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

### Backend API Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the api directory:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:
```bash
npm start
```
The API will run on `http://localhost:8800/api`

### Admin Dashboard Setup

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. The proxy is configured in `package.json` to point to `http://localhost:8800/api`

4. Start the development server:
```bash
npm start
```
The admin dashboard will run on `http://localhost:3000`

### Client Website Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. The proxy is configured in `package.json` to point to `http://localhost:8800/api`

4. Start the development server:
```bash
npm start
```
The client website will run on `http://localhost:3001` (or next available port)

## � Manual Dependency Installation

If `package.json` files are deleted, you can manually install all dependencies for each component using the commands below:

### Backend API Dependencies

Navigate to the api directory and install:

```bash
cd api

npm install express@^4.18.2
npm install mongoose@^7.0.3
npm install dotenv@^16.0.3
npm install bcryptjs@^2.4.3
npm install jsonwebtoken@^9.0.0
npm install jwt@^0.2.0
npm install cookie-parser@^1.4.6
npm install cors@^2.8.5
npm install nodemon@^2.0.22
```

Or install all at once:
```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken jwt cookie-parser cors nodemon
```

Then add the scripts to `package.json`:
```json
{
  "scripts": {
    "start": "nodemon index.js"
  }
}
```

### Admin Dashboard Dependencies

Navigate to the admin directory and install:

```bash
cd admin

npm install react@^17.0.2
npm install react-dom@^17.0.2
npm install react-router-dom@^6.2.2
npm install react-scripts@5.0.0
npm install axios@^1.3.6
npm install @mui/material@^5.4.4
npm install @mui/icons-material@^5.4.4
npm install @mui/x-data-grid@^5.5.1
npm install @emotion/react@^11.8.1
npm install @emotion/styled@^11.8.1
npm install recharts@^2.1.9
npm install react-circular-progressbar@^2.0.4
npm install sass@^1.49.9
npm install @testing-library/react@^12.1.3
npm install @testing-library/jest-dom@^5.16.2
npm install @testing-library/user-event@^13.5.0
npm install web-vitals@^2.1.4
```

Or install all at once:
```bash
npm install react@^17.0.2 react-dom@^17.0.2 react-router-dom@^6.2.2 react-scripts@5.0.0 axios@^1.3.6 @mui/material@^5.4.4 @mui/icons-material@^5.4.4 @mui/x-data-grid@^5.5.1 @emotion/react@^11.8.1 @emotion/styled@^11.8.1 recharts@^2.1.9 react-circular-progressbar@^2.0.4 sass@^1.49.9 @testing-library/react@^12.1.3 @testing-library/jest-dom@^5.16.2 @testing-library/user-event@^13.5.0 web-vitals@^2.1.4
```

Then add the scripts and proxy to `package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:8800/api"
}
```

### Client Website Dependencies

Navigate to the client directory and install:

```bash
cd client

npm install react@^18.0.0
npm install react-dom@^18.0.0
npm install react-router-dom@^6.3.0
npm install react-scripts@5.0.1
npm install axios@^1.3.5
npm install @fortawesome/fontawesome-svg-core@^6.1.1
npm install @fortawesome/free-solid-svg-icons@^6.1.1
npm install @fortawesome/free-regular-svg-icons@^6.1.1
npm install @fortawesome/react-fontawesome@^0.1.18
npm install react-date-range@^1.4.0
npm install date-fns@^2.28.0
npm install @testing-library/react@^13.1.1
npm install @testing-library/jest-dom@^5.16.4
npm install @testing-library/user-event@^13.5.0
npm install web-vitals@^2.1.4
```

Or install all at once:
```bash
npm install react@^18.0.0 react-dom@^18.0.0 react-router-dom@^6.3.0 react-scripts@5.0.1 axios@^1.3.5 @fortawesome/fontawesome-svg-core@^6.1.1 @fortawesome/free-solid-svg-icons@^6.1.1 @fortawesome/free-regular-svg-icons@^6.1.1 @fortawesome/react-fontawesome@^0.1.18 react-date-range@^1.4.0 date-fns@^2.28.0 @testing-library/react@^13.1.1 @testing-library/jest-dom@^5.16.4 @testing-library/user-event@^13.5.0 web-vitals@^2.1.4
```

Then add the scripts and proxy to `package.json`:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:8800/api"
}
```

## Authentication

The system uses JWT (JSON Web Token) authentication:

- Users register and login through the API
- Passwords are hashed using bcryptjs before storing
- JWT tokens are generated upon successful login
- Protected routes require valid authentication tokens
- Admin routes have additional authorization checks

## Key Features

✅ User registration and authentication
✅ Hotel browsing and searching
✅ Room availability management with date blocking
✅ Hotel booking system
✅ Admin dashboard for management
✅ User management (CRUD operations)
✅ Hotel/Product management
✅ Data visualization and analytics
✅ Dark mode theme support
✅ Responsive design
✅ Error handling and validation
✅ Cookie-based session management

## Technology Stack Summary

| Layer | Technologies |
|-------|--------------|
| **Frontend (Client)** | React 18, React Router, Axios, CSS, Date-fns |
| **Frontend (Admin)** | React 17, Material-UI, Recharts, SASS, React Router |
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |
| **Development** | Nodemon, Create React App, npm |

## Notes

- The project is a work in progress with some features still being developed
- The admin dashboard uses a protected route system to ensure only authenticated admins can access features
- Both frontend applications use a custom `useFetch` hook for API calls
- Error handling is implemented at the API level with custom error messages
- The system supports multi-user scenarios with different permission levels (admin vs. regular users)

## License

ISC License

---

**Developer:** GoHoteline Team  
**Status:** In Development  
**Last Updated:** 2024
