# GoHoteline Backend API

RESTful API server for the GoHoteline hotel booking and management system. Built with Node.js, Express, and MongoDB.

## Overview

The backend API provides:
- User authentication and authorization
- Hotel CRUD operations
- Room management and availability tracking
- User account management
- Secure data persistence with MongoDB
- Error handling and validation

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM (Object Data Modeling)
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Cookie Parser** - Session management
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variables
- **Nodemon** - Development auto-reload

## Project Structure

```
api/
├── controllers/
│   ├── auth.js          # Authentication logic (register, login)
│   ├── hotel.js         # Hotel CRUD operations
│   ├── room.js          # Room management
│   └── user.js          # User management
├── models/
│   ├── Hotel.js         # Hotel schema
│   ├── Room.js          # Room schema
│   └── User.js          # User schema
├── routes/
│   ├── auth.js          # Auth endpoints
│   ├── hotels.js        # Hotel endpoints
│   ├── rooms.js         # Room endpoints
│   └── users.js         # User endpoints
├── utils/
│   ├── error.js         # Error handling utility
│   └── verifyToken.js   # JWT verification middleware
├── index.js             # Server entry point
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas cloud instance)

### Installation

1. Navigate to the api directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the api directory:
```env
MONGO_URL=mongodb://localhost:27017/gohoteline
JWT_SECRET=your_super_secret_jwt_key_here
PORT=8800
```

**Note:** 
- For MongoDB Atlas: Use `mongodb+srv://username:password@cluster.mongodb.net/gohoteline`
- Use a strong JWT_SECRET for production
- PORT defaults to 8800 if not specified

4. Start the development server:
```bash
npm start
```

The API will be available at `http://localhost:8800/api`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password",
  "country": "USA",
  "city": "New York",
  "phone": "+1234567890"
}

Response: 201 Created
"User created successfully"
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}

Response: 200 OK
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

### User Routes (`/api/users`)

#### Get All Users
```
GET /api/users
Authorization: Bearer <jwt_token>

Response: 200 OK
[
  {
    "_id": "...",
    "username": "john_doe",
    "email": "john@example.com",
    "city": "New York",
    "country": "USA",
    "phone": "+1234567890",
    "isAdmin": false,
    "createdAt": "2023-01-15T...",
    "updatedAt": "2023-01-15T..."
  },
  ...
]
```

#### Get Single User
```
GET /api/users/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
{
  "_id": "...",
  "username": "john_doe",
  "email": "john@example.com",
  "city": "New York",
  "country": "USA",
  "phone": "+1234567890",
  "isAdmin": false
}
```

#### Create User
```
POST /api/users
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "username": "jane_doe",
  "email": "jane@example.com",
  "password": "secure_password",
  "country": "USA",
  "city": "Los Angeles",
  "phone": "+1987654321"
}

Response: 201 Created
"User created successfully"
```

#### Update User
```
PUT /api/users/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "city": "Boston",
  "phone": "+1555555555"
}

Response: 200 OK
"User updated successfully"
```

#### Delete User
```
DELETE /api/users/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
"User deleted successfully"
```

### Hotel Routes (`/api/hotels`)

#### Get All Hotels
```
GET /api/hotels
Query Parameters: ?featured=true (optional)

Response: 200 OK
[
  {
    "_id": "...",
    "name": "Grand Palace Hotel",
    "type": "5-star",
    "city": "New York",
    "address": "123 Main St",
    "distance": "0.5 km from center",
    "photos": ["url1", "url2"],
    "title": "Luxury Hotel in Manhattan",
    "desc": "Experience luxury...",
    "rating": 4.8,
    "rooms": ["roomId1", "roomId2"],
    "cheapestPrice": 150,
    "featured": true
  },
  ...
]
```

#### Get Featured Hotels
```
GET /api/hotels/featured
Query Parameters: ?limit=5 (optional)

Response: 200 OK
[featured hotels...]
```

#### Get Hotels by City Count
```
GET /api/hotels/countByCity
Query Parameters: ?cities=New York,Los Angeles,Chicago

Response: 200 OK
[
  { "_id": "New York", "count": 15 },
  { "_id": "Los Angeles", "count": 8 },
  { "_id": "Chicago", "count": 12 }
]
```

#### Get Single Hotel
```
GET /api/hotels/:id

Response: 200 OK
{
  "_id": "...",
  "name": "Grand Palace Hotel",
  "type": "5-star",
  "city": "New York",
  ...
}
```

#### Create Hotel (Admin Only)
```
POST /api/hotels
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "New Hotel",
  "type": "4-star",
  "city": "Boston",
  "address": "456 Oak Ave",
  "distance": "1 km from center",
  "photos": ["url1", "url2"],
  "title": "Quality Hotel",
  "desc": "Great location...",
  "rating": 4.5,
  "cheapestPrice": 120,
  "featured": false
}

Response: 201 Created
"Hotel created successfully"
```

#### Update Hotel (Admin Only)
```
PUT /api/hotels/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "rating": 4.7,
  "cheapestPrice": 130
}

Response: 200 OK
"Hotel updated successfully"
```

#### Delete Hotel (Admin Only)
```
DELETE /api/hotels/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
"Hotel deleted successfully"
```

### Room Routes (`/api/rooms`)

#### Get All Rooms
```
GET /api/rooms

Response: 200 OK
[
  {
    "_id": "...",
    "title": "Double Bed Room",
    "price": 150,
    "maxPeople": 2,
    "desc": "Comfortable room with...",
    "roomNumber": [
      {
        "number": 101,
        "unavailableDates": ["2023-01-20", "2023-01-21"]
      },
      ...
    ],
    "createdAt": "2023-01-15T...",
    "updatedAt": "2023-01-15T..."
  },
  ...
]
```

#### Create Room (Admin Only)
```
POST /api/rooms
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Suite Room",
  "price": 250,
  "maxPeople": 4,
  "desc": "Luxury suite with...",
  "roomNumber": [
    { "number": 201, "unavailableDates": [] },
    { "number": 202, "unavailableDates": [] }
  ]
}

Response: 201 Created
"Room created successfully"
```

#### Update Room Availability (Admin Only)
```
PUT /api/rooms/update/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "noOfDays": 3,
  "startDate": 1674086400 (Unix timestamp)
}

Response: 200 OK
"Room updated successfully"
```

#### Delete Room (Admin Only)
```
DELETE /api/rooms/:id
Authorization: Bearer <jwt_token>

Response: 200 OK
"Room deleted successfully"
```

## Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  country: String (required),
  city: String (required),
  phone: String (required),
  password: String (hashed, required),
  img: String (optional),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Hotel Model
```javascript
{
  name: String (required),
  type: String (required),
  city: String (required),
  address: String (required),
  distance: String (required),
  photos: [String] (required),
  title: String (required),
  desc: String (required),
  rating: Number (0-5),
  rooms: [String] (array of room IDs),
  cheapestPrice: Number (required),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Room Model
```javascript
{
  title: String (required),
  price: Number (required),
  maxPeople: Number (required),
  desc: String (required),
  roomNumber: [{
    number: Number,
    unavailableDates: [Date]
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication & Security

### JWT (JSON Web Tokens)
- Generated on successful login
- Stored in cookies on client
- Required for protected endpoints
- Token includes user ID and admin status

### Password Security
- Passwords hashed with bcryptjs (salt rounds: 10)
- Never stored in plain text
- Verified on login using bcrypt.compare()

### Protected Routes
- Most endpoints require JWT authentication
- Admin-only endpoints verify isAdmin flag
- Middleware validates token before allowing access

## Middleware

### CORS
Enables cross-origin requests from frontend applications

### Cookie Parser
Parses incoming cookies for session management

### Express JSON
Parses incoming JSON requests

### Error Handler
Custom error handling middleware catches and formats errors

## Error Handling

The API implements custom error handling:

```javascript
// Format
{
  success: false,
  status: 400,
  message: "Error message",
  stack: "Error stack trace (development only)"
}
```

Common error codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

## Testing Endpoints

Use Postman, Insomnia, or cURL to test endpoints:

```bash
# Register a new user
curl -X POST http://localhost:8800/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "country": "USA",
    "city": "New York",
    "phone": "+1234567890"
  }'

# Get all hotels
curl http://localhost:8800/api/hotels

# Login
curl -X POST http://localhost:8800/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## Available Scripts

In the `api/` directory, you can run:

### `npm start`
Runs the server with Nodemon (auto-reloads on file changes)

### `npm run dev`
Alternative command for development (if available)

## Common Issues

### MongoDB Connection Failed
- Check MongoDB is running locally or MongoDB Atlas is accessible
- Verify MONGO_URL in .env file
- Check network connectivity

### JWT Token Expired
- Tokens expire based on backend configuration
- User needs to login again to get new token
- Clear cookies and try logging in again

### 401 Unauthorized
- JWT token is missing or invalid
- Token has expired
- User permissions insufficient for endpoint

### CORS Errors
- Ensure CORS is properly configured
- Check frontend URL is allowed in CORS settings
- Verify cookies are sent with requests

## Learn More

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)

## License

ISC License

---

**Last Updated:** March 2026  
**Version:** 1.0.0
