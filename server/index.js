require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multerConfig = require("./middleware/multerConfig");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  console.log('Request Headers:', req.headers);
  next();
});

// Mount routes BEFORE connecting to database
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Log all registered routes
console.log("=== REGISTERING ROUTES ===");
console.log("Mounting /user routes");
app.use("/user", userRoutes);
console.log("Mounting /auth routes");
app.use("/auth", authRoutes);
console.log("Mounting /uploads static route");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debug endpoint to list all registered routes
app.get("/debug", (req, res) => {
  console.log("=== DEBUG ENDPOINT ACCESSED ===");
  const routes = [];

  // Function to extract routes from middleware stack
  const extractRoutes = (stack, prefix = '') => {
    stack.forEach(middleware => {
      if (middleware.route) {
        // Route directly on app
        routes.push({
          path: prefix + middleware.route.path,
          methods: Object.keys(middleware.route.methods).filter(method => middleware.route.methods[method])
        });
      } else if (middleware.name === 'router') {
        // Router middleware
        const routerPrefix = prefix + (middleware.regexp.toString().includes('^\\/auth') ? '/auth' :
          middleware.regexp.toString().includes('^\\/user') ? '/user' : '');

        middleware.handle.stack.forEach(handler => {
          if (handler.route) {
            routes.push({
              path: routerPrefix + handler.route.path,
              methods: Object.keys(handler.route.methods).filter(method => handler.route.methods[method])
            });
          }
        });
      }
    });
  };

  extractRoutes(app._router.stack);

  console.log("Available routes:", routes);

  res.json({
    message: "Server is running",
    routes: routes,
    env: {
      port: PORT,
      emailConfigured: !!process.env.EMAIL_USER && !!process.env.EMAIL_PASS,
      frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
    }
  });
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Connect to MongoDB and start server
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("=== AVAILABLE ROUTES ===");

      // Function to extract routes from middleware stack
      const extractRoutes = (stack, prefix = '') => {
        stack.forEach(middleware => {
          if (middleware.route) {
            // Route directly on app
            console.log(`${Object.keys(middleware.route.methods).filter(method => middleware.route.methods[method]).join(', ')} ${prefix}${middleware.route.path}`);
          } else if (middleware.name === 'router') {
            // Router middleware
            const routerPrefix = prefix + (middleware.regexp.toString().includes('^\\/auth') ? '/auth' :
              middleware.regexp.toString().includes('^\\/user') ? '/user' : '');

            middleware.handle.stack.forEach(handler => {
              if (handler.route) {
                console.log(`${Object.keys(handler.route.methods).filter(method => handler.route.methods[method]).join(', ')} ${routerPrefix}${handler.route.path}`);
              }
            });
          }
        });
      };

      extractRoutes(app._router.stack);
    });
  })
  .catch((err) => console.log("Database connection error:", err));