const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const vendorRoutes = require("./routes/vendors");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");
const cors = require("cors");

dotenv.config();

const app = express();
// Allow requests from specific origins

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend URL
    methods: "GET,POST,PATCH,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);
// MongoDB Connection
const connectDB = require("./config/db");
connectDB(); // database connected to server

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // builds api
