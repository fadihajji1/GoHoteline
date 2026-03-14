# Client Website

The public-facing hotel booking platform where customers can search, browse, and reserve hotels.

## Overview

The client website is a React-based web application that provides users with:
- Browse available hotels
- Search and filter hotels by location and dates
- View detailed hotel information
- Reserve rooms with date selection
- User authentication (login/registration)
- Responsive design for all devices

## Technology Stack

- **React 18** - UI framework
- **React Router v6** - Page routing
- **Axios** - HTTP client for API calls
- **react-date-range** - Date picker component
- **date-fns** - Date manipulation library
- **FontAwesome** - Icon library
  - @fortawesome/fontawesome-svg-core
  - @fortawesome/free-solid-svg-icons
  - @fortawesome/free-regular-svg-icons
  - @fortawesome/react-fontawesome
- **CSS** - Styling with responsive design

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── featured/           # Featured hotels showcase
│   │   ├── featuredProperties/ # Featured properties section
│   │   ├── footer/             # Footer component
│   │   ├── header/             # Header with search bar
│   │   ├── mailList/           # Newsletter subscription
│   │   ├── navbar/             # Top navigation bar
│   │   ├── propertyList/       # Property listing grid
│   │   ├── reserve/            # Booking/reservation form
│   │   └── searchItem/         # Individual search result item
│   ├── context/
│   │   ├── AuthContext.js      # Authentication state
│   │   └── SearchContext.js    # Search/booking state
│   ├── pages/
│   │   ├── home/               # Homepage
│   │   ├── hotel/              # Hotel detail page
│   │   ├── list/               # Search results page
│   │   └── login/              # User login page
│   ├── hooks/
│   │   └── useFetch.js         # Custom data fetching hook
│   ├── App.js                  # Main app component with routing
│   ├── index.js                # React root entry point
│   └── pages/
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

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The website will open at `http://localhost:3000` (or next available port if 3000 is in use)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Key Features

### 1. **Homepage**
- Hero banner with featured hotels
- Featured properties carousel
- Property list by category
- Newsletter subscription section
- Footer with links and information

### 2. **Hotel Search**
- Search bar with location input
- Date range picker for check-in and check-out
- Number of guests selector
- Search functionality connected to API
- Filtered results display

### 3. **Hotel Browsing**
- Property listing grid with images
- Price display and ratings
- Hotel type indicators
- Click to view hotel details
- Smooth navigation between listings

### 4. **Hotel Details**
- Full hotel information including:
  - Hotel name, description, and rating
  - Photos and amenities
  - Address and distance from city center
  - Available rooms with pricing
  - Guest reviews (if available)

### 5. **Booking/Reservation**
- Date selection for check-in and check-out
- Available room selection
- Number of guests specification
- Reservation form modal
- Booking confirmation

### 6. **User Authentication**
- Login page for existing users
- User context management
- Protected booking functionality
- Session persistence

### 7. **Responsive Design**
- Mobile-first design approach
- Desktop, tablet, and mobile support
- Flexible layout using CSS Flexbox
- Touch-friendly interface elements

## User Interface

### Color Scheme
- Modern, clean design
- Readable typography
- High contrast for accessibility
- Professional appearance

### Components

**Navbar** - Top navigation bar with:
- Logo/brand name
- Navigation links
- User login/account section

**Header** - Search section with:
- Location input
- Date range picker
- Guest counter
- Search button

**Featured Section** - Showcase of:
- Top-rated hotels
- Special offers
- Popular destinations

**Property List** - Grid display of:
- Hotel images
- Name and rating
- Price information
- Quick view option

**Search Item** - Individual hotel card showing:
- Hotel image
- Name and rating
- Price per night
- Description snippet
- View details button

**Reserve Modal** - Booking form with:
- Date selection
- Room selection
- Guest count
- Confirmation button

**Footer** - Contains:
- Links and navigation
- Contact information
- Social media
- Copyright

## Authentication

### Login Flow
1. User clicks login button
2. Redirected to login page
3. Enter credentials (username/password)
4. Submit form to API
5. Receive JWT token on success
6. Token stored in AuthContext
7. Redirect to home or intended page

### Protected Features
- Booking requires authentication
- Personal user information
- Account management

## State Management

### AuthContext
Manages:
- Current logged-in user
- Authentication tokens
- Login/logout functions
- User session state

### SearchContext
Manages:
- Search query (destination, dates, guests)
- Search results
- Selected hotel for booking
- Booking information

## API Integration

The website connects to the backend API endpoints:

**Authentication:**
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

**Hotels:**
- GET `/api/hotels` - Get all hotels
- GET `/api/hotels?city=` - Search hotels by city
- GET `/api/hotels/featured` - Get featured hotels
- GET `/api/hotels/:id` - Get single hotel details

**Rooms:**
- GET `/api/rooms` - Get all available rooms
- GET `/api/rooms/:hotelId` - Get hotel rooms

**Bookings:**
- POST `/api/bookings` - Create new booking
- GET `/api/bookings/:userId` - Get user bookings

## Usage Flow

1. **User lands on homepage**
   - Sees featured hotels and property list
   - Can browse without authentication

2. **User searches for hotels**
   - Enters destination, dates, and guest count
   - System fetches matching hotels from API
   - Results displayed in search results page

3. **User views hotel details**
   - Clicks on a hotel card
   - View full information and photos
   - See available rooms

4. **User makes a booking**
   - If not logged in, redirected to login
   - Select dates and room
   - Fill booking form
   - Submit reservation
   - Confirmation displayed

## Available Scripts

In the `client/` directory, you can run:

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

### Environment Variables
Create a `.env` file for custom configuration:
```
REACT_APP_API_URL=http://localhost:8800/api
```

## Common Issues

### API Connection Failed
- Ensure backend API is running on port 8800
- Check CORS is enabled on backend
- Verify proxy setting in package.json

### Date Picker Not Working
- Check react-date-range is properly installed
- Verify CSS is imported
- Clear browser cache

### Images Not Loading
- Verify image URLs from API
- Check network tab in browser DevTools
- Ensure backend server is accessible

### Login Issues
- Check credentials are correct
- Verify backend API is running
- Clear browser cookies
- Check JWT token expiration

## Learn More

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Date Range Documentation](https://www.npmjs.com/package/react-date-range)
- [Date-fns Documentation](https://date-fns.org/)
- [FontAwesome Documentation](https://fontawesome.com/)

## License

ISC License

---

**Last Updated:** March 2026  
**Version:** 0.1.0
