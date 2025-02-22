// File: backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Import Order along with User and sequelize from your models
const { sequelize, User, Order } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register Endpoint
app.post('/api/users/register', async (req, res) => {
  try {
    // Include 'phone' in the destructuring
    const { username, email, password, role, phone } = req.body;

    // Check if user/email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user (include phone here)
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role: role || 'customer',
      phone  // storing phone in the DB
    });

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Create a JWT payload and sign it
    const payload = {
      userId: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// (Optional) Example of a protected route using JWT middleware
// Example authMiddleware in backend/server.js
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.error("No token provided");
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"
  console.log("Received token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: 'Invalid token.' });
    }
    console.log("Decoded token payload:", decoded);
    req.user = decoded;
    next();
  });
};

// Parts Routes
const partsRoutes = require("./routes/parts");
app.use("/api/parts", partsRoutes);

// Orders Endpoint - Create Order
app.post("/api/orders", async (req, res) => {
  try {
    const { parts, partsTotal, customBuildFee, grandTotal } = req.body;
    
    // Create the order and store parts as JSON
    const newOrder = await Order.create({
      total_cost: grandTotal,
      status: "Pending",
      order_items: parts, // parts is an array of items
    });

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});


app.get("/api/orders", async (req, res) => {
  try {
    // Assuming you use the single-table order approach with JSON order_items
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.put("/api/orders/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find the order in the database
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update status to "Cancelled"
    order.status = "Cancelled";
    await order.save();

    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

// File: backend/server.js (or routes/orders.js)
app.delete("/api/orders/:orderId/cancel", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order in the database
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Delete the order record
    await order.destroy();

    return res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({ message: "Failed to delete order" });
  }
});



// Protected route: PUT /api/users/me
// Example: backend/server.js
// File: backend/server.js (or routes/users.js)
app.get("/api/users/me", authMiddleware, async (req, res) => {
  try {
    // 1) Extract the userId from req.user (set by your JWT auth middleware)
    const userId = req.user.userId; // e.g. if your token payload is { userId: 1, ... }

    // 2) Find the user in your "Users" table by primary key
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3) Return the user data (omitting the password)
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});


app.put("/api/users/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, phone, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }
    await user.save();

    res.json({
      message: "Profile updated",
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
});




// Start Server (all routes are registered before starting the server)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Sync Database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
