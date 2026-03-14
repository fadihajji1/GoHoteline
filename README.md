# Admin Dashboard

A comprehensive admin management interface for hotel administrators to manage users, hotels, and room inventory.

## Overview

The admin dashboard is a React-based web application that provides hotel management staff with tools to:
- Manage user accounts (create, read, update, delete)
- Manage hotel listings and properties
- Manage room inventory and availability
- View analytics and statistics
- Monitor business metrics through charts and visualizations

## Technology Stack

- **React 17** - UI framework
- **React Router v6** - Page routing
- **Material-UI (MUI)** - Component library
  - @mui/material - Core components
  - @mui/icons-material - Icon set
  - @mui/x-data-grid - Advanced data tables
- **Recharts** - Data visualization and charts
- **Axios** - HTTP client for API calls
- **SASS** - Styling preprocessor
- **Context API** - State management
- **Emotion** - CSS-in-JS styling library

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── chart/              # Chart component for analytics
│   │   ├── datatable/          # Reusable data grid table
│   │   ├── featured/           # Featured items widget
│   │   ├── navbar/             # Top navigation bar
│   │   ├── sidebar/            # Side navigation menu
│   │   ├── table/              # Basic table component
│   │   └── widget/             # Dashboard widget boxes
│   ├── context/
│   │   ├── AuthContext.js      # Authentication state management
│   │   ├── darkModeContext.js  # Dark mode state
│   │   └── darkModeReducer.js  # Dark mode reducer logic
│   ├── pages/
│   │   ├── home/               # Dashboard homepage
│   │   ├── list/               # List view for users/products
│   │   ├── login/              # Admin login page
│   │   ├── new/                # Create new item form
│   │   └── single/             # Detailed item view
│   ├── hooks/
│   │   └── useFetch.js         # Custom hook for fetching data
│   ├── style/
│   │   └── dark.scss           # Dark theme styles
│   ├── formSource.js           # Form field configurations
│   ├── datatablesource.js      # Data grid configurations
│   ├── App.js                  # Main app component with routing
│   └── index.js                # React root entry point
├── public/
│   └── index.html              # HTML template
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8800/api`

### Installation

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The dashboard will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Key Features

### 1. **Authentication**
- Admin login page with credential validation
- Protected routes - only authenticated admins can access features
- Logout functionality with session management
- JWT token-based authentication

### 2. **User Management**
- View all users in a data table with sorting and filtering
- View detailed user information
- Create new user accounts
- Edit existing user information
- Delete user accounts
- Display user data: username, email, phone, city, country

### 3. **Product/Hotel Management**
- Browse all hotels in a comprehensive data table
- View detailed hotel information
- Create new hotel listings
- Edit hotel details
- Delete hotel listings
- Manage hotel metadata: name, type, city, address, rating, featured status

### 4. **Dashboard Analytics**
- Overview statistics with widgets
- Revenue charts and trends
- Featured items display
- Recent transactions view
- Data visualization with Recharts

### 5. **User Interface**
- Dark mode and light mode themes
- Responsive sidebar navigation
- Top navigation bar with user menu
- Professional Material-UI components
- Loading states and error handling

## Authentication Flow

1. User enters credentials on the login page
2. Credentials are sent to the backend API
3. Backend validates and returns JWT token
4. Token is stored in the application context
5. Protected routes check for valid token before rendering
6. Unauthorized access redirects to login page

## Dark Mode

The dashboard includes a dark mode feature:
- Toggle dark mode from the navbar
- Theme preference is managed with Context API
- All components respect the current theme
- SASS mixins apply theme-specific styling

## Data Fetching

The application uses a custom `useFetch` hook for data fetching:
- Automatic API calls on component mount
- Loading state management
- Error handling and display
- Data caching and refresh capabilities

## Styling

- **SASS/SCSS** for component styling
- **Material-UI** for pre-built components
- **Emotion** for CSS-in-JS styling
- Modular SCSS files per component
- Dark mode support with CSS variables

## API Integration

The dashboard connects to the backend API with the following endpoints:

**Users:**
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get single user
- POST `/api/users` - Create user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

**Hotels:**
- GET `/api/hotels` - Get all hotels
- GET `/api/hotels/:id` - Get single hotel
- POST `/api/hotels` - Create hotel
- PUT `/api/hotels/:id` - Update hotel
- DELETE `/api/hotels/:id` - Delete hotel

## Available Scripts

In the `admin/` directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm eject`
Exposes all configuration (one-way operation - cannot be undone).

## Configuration

### API Proxy
The `package.json` includes a proxy setting:
```json
"proxy": "http://localhost:8800/api"
```

This allows API calls to be made to relative paths like `/users` instead of full URLs.

### Environment Variables
To set custom API endpoints, create a `.env` file:
```
REACT_APP_API_URL=http://localhost:8800/api
```

## Common Issues

### API Connection Issues
- Ensure backend API is running on port 8800
- Check that CORS is enabled on the backend
- Verify proxy setting in package.json

### Authentication Errors
- Clear browser cookies and cache
- Check backend JWT secret configuration
- Verify credentials in login form

### Dark Mode Not Working
- Clear browser local storage
- Hard refresh the page (Ctrl+Shift+R)
- Check darkModeContext.js is properly configured

## Learn More

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Recharts Documentation](https://recharts.org/)

## License

ISC License

---

**Last Updated:** March 2026  
**Version:** 0.1.0
