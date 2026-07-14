# Axara E-Commerce

A full-stack e-commerce application built with React and Express, featuring user authentication, product management, and order processing. Axara provides a modern, responsive shopping experience with a scalable backend infrastructure.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4, Redux Toolkit
- **Backend:** Node.js, Express.js, MongoDB
- **Key Libraries:** 
  - Framer Motion (animations)
  - Axios (HTTP requests)
  - JWT (authentication)
  - Bcryptjs (password hashing)
  - React Router v7 (client-side routing)

## Project Structure

```
axara-e-commerce/
├── client/                 # React frontend application
│   ├── src/               # React components and pages
│   ├── public/            # Static assets
│   ├── package.json       # Client dependencies (React, Redux, Tailwind)
│   └── vite.config.js     # Vite configuration with React & Tailwind plugins
│
├── server/                # Express.js backend API
│   ├── routes/            # API endpoints (auth, products, orders)
│   ├── models/            # MongoDB schemas (User, Product, Order)
│   ├── middleware/        # Error handling, authentication
│   ├── controllers/       # Business logic
│   ├── server.js          # Express app initialization
│   ├── seeder.js          # Database seeding script
│   └── package.json       # Server dependencies (Express, MongoDB)
│
└── README.md              # This file
```

## How It Works

**Frontend → Backend Flow:**
1. React frontend runs on `http://localhost:5173` (Vite default)
2. Users interact with the UI (browse products, authenticate, place orders)
3. Axios makes HTTP requests to the Express backend API
4. Redux Toolkit manages global state for auth, products, and cart

**Backend → Database Flow:**
1. Express server listens on port 5000 (configurable via `PORT` env var)
2. All requests go through CORS middleware (configured for the client URL)
3. Routes handle auth, product queries, and order management
4. Mongoose communicates with MongoDB for data persistence

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance via MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshaybankar007/axara-e-commerce.git
   cd axara-e-commerce
   ```

2. **Setup the Server**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server/` directory:
   ```
   MONGO_URI=mongodb://localhost:27017/axara
   PORT=5000
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key_here
   ```

   Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` with hot-reload via Nodemon.

3. **Setup the Client**
   ```bash
   cd client
   npm install
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` with Vite's HMR.

### Optional: Seed the Database
To populate the database with sample products:
```bash
cd server
npm run seed
```

## Available Scripts

### Client Scripts
- `npm run dev` – Start Vite dev server with HMR
- `npm run build` – Build for production
- `npm run lint` – Run ESLint
- `npm run preview` – Preview production build locally

### Server Scripts
- `npm start` – Start Express server with auto-reload (Nodemon)
- `npm run seed` – Seed MongoDB with sample data
- `npm test` – Run tests (not yet configured)

## API Endpoints

### Authentication
- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login
- `POST /api/auth/logout` – User logout

### Products
- `GET /api/products` – Get all products
- `GET /api/products/:id` – Get single product
- `POST /api/products` – Create product (admin)
- `PUT /api/products/:id` – Update product (admin)
- `DELETE /api/products/:id` – Delete product (admin)

### Orders
- `POST /api/orders` – Create new order
- `GET /api/orders` – Get user orders
- `GET /api/orders/:id` – Get order details
- `PUT /api/orders/:id` – Update order status (admin)

### Health Check
- `GET /api/health` – Check API status

## Environment Variables

### Server (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/axara` |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` |

### Client (.env.local) [if needed]
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

## Development Workflow

1. **Frontend Development**: Changes in `/client/src` trigger hot module replacement
2. **Backend Development**: Changes in `/server` trigger restart via Nodemon
3. **Testing Changes**: Open `http://localhost:5173` in your browser to see the app
4. **API Testing**: Use Postman or cURL to test endpoints on `http://localhost:5000`

## Production Build

### Frontend
```bash
cd client
npm run build
# Output: dist/ folder (optimized production build)
```

### Backend
Ensure environment variables are set, then run:
```bash
npm start
```

Deploy the `client/dist` folder to a static hosting service (Vercel, Netlify, etc.) and run the server on your backend infrastructure.

## Features

- ✅ User Authentication (JWT-based)
- ✅ Secure Password Hashing (Bcryptjs)
- ✅ Product Browsing & Filtering
- ✅ Shopping Cart (Redux state management)
- ✅ Order Management
- ✅ Responsive UI (Tailwind CSS)
- ✅ Smooth Animations (Framer Motion)
- ✅ Input Validation (Express Validator)
- ✅ Error Handling & Logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the ISC License.

## Author

**Akshay Bankar**  
GitHub: [@akshaybankar007](https://github.com/akshaybankar007)

## Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/akshaybankar007/axara-e-commerce/issues).

---

**Happy coding! 🚀**
