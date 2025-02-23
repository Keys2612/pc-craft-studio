// File: backend/routes/users.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db");

const saltRounds = 10; // Adjust salt rounds as needed

// Authentication middleware: verifies the JWT and adds the payload to req.user
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = payload; // payload should include userId, etc.
    next();
  });
}

// POST /api/users/register - Create a new user (without storing name)
router.post("/register", async (req, res) => {
  try {
    // Extract required fields from request body
    const { username, email, phone, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the "Users" table with a default role ('customer')
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

    // Create a JWT token (ensure JWT_SECRET is defined in your .env)
    const token = jwt.sign(
      { userId: user.id }, // payload contains userId
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

// GET /api/users/me - Fetch current user's profile (excluding role)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // extracted from token
    const query = `SELECT username, email, phone FROM "Users" WHERE id = $1;`;
    const result = await pool.query(query, [userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// PUT /api/users/me - Update current user's profile (excluding role)
router.put("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, phone, password } = req.body;
    let updateQuery, values;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateQuery = `
        UPDATE "Users"
        SET username = $1, email = $2, phone = $3, password = $4
        WHERE id = $5
        RETURNING username, email, phone;
      `;
      values = [username, email, phone, hashedPassword, userId];
    } else {
      updateQuery = `
        UPDATE "Users"
        SET username = $1, email = $2, phone = $3
        WHERE id = $4
        RETURNING username, email, phone;
      `;
      values = [username, email, phone, userId];
    }
    const result = await pool.query(updateQuery, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;
