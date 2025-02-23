// File: backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const partsRoutes = require("./routes/parts");
const usersRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test DB route (optional)
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1;");
    res.json({ message: "Database connection is working", result: result.rows });
  } catch (error) {
    console.error("DB connection test failed:", error);
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});

// Mount routes
app.use("/api/parts", partsRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Optional: Test connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
  } else {
    console.log("Database connected successfully");
    release();
  }
});
