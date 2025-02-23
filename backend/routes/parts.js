// File: backend/routes/parts.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/parts - fetch all parts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Parts" ORDER BY id;');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching parts:", error);
    res.status(500).json({ message: "Failed to fetch parts" });
  }
});

// POST /api/parts - add a new part
router.post("/", async (req, res) => {
  try {
    const { name, price, category, stock, imageUrl } = req.body;
    const insertQuery = `
      INSERT INTO "Parts" (name, price, category, stock, "imageUrl")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, price, category, stock, imageUrl];
    const result = await pool.query(insertQuery, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding part:", error);
    res.status(500).json({ message: "Failed to add part" });
  }
});

// PUT /api/parts/:id - update an existing part
router.put("/:id", async (req, res) => {
  try {
    const partId = req.params.id;
    const { name, price, category, stock, imageUrl } = req.body;
    const updateQuery = `
      UPDATE "Parts" 
      SET name = $1, price = $2, category = $3, stock = $4, "imageUrl" = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [name, price, category, stock, imageUrl, partId];
    const result = await pool.query(updateQuery, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Part not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating part:", error);
    res.status(500).json({ message: "Failed to update part" });
  }
});

module.exports = router;
