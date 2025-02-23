// File: backend/routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db");

const saltRounds = 10; // You can adjust salt rounds as needed

// POST /api/users/register - Create a new user
router.post("/register", async (req, res) => {
  try {
    // Extract fields from the request body
    const { username, email, phone, password } = req.body;

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into "Users" table, default role = 'customer'
    const insertQuery = `
      INSERT INTO "Users" (username, email, password, phone, role)
      VALUES ($1, $2, $3, $4, 'customer')
      RETURNING *;
    `;
    const values = [username, email, hashedPassword, phone];
    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

// POST /api/users/login - Authenticate a user and return a token
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Query the user by username
    const query = `SELECT * FROM "Users" WHERE username = $1;`;
    const result = await pool.query(query, [username]);

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create a JWT token (ensure JWT_SECRET is in .env)
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to log in" });
  }
});

module.exports = router;
