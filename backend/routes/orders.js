// File: backend/routes/orders.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/orders - fetch all orders
router.get("/", async (req, res) => {
  try {
    // Return all orders in the Orders table (adjust as needed for user filtering)
    const result = await pool.query('SELECT * FROM "Orders" ORDER BY id;');
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// POST /api/orders - create a new order
router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const { parts, partsTotal, customBuildFee, grandTotal } = req.body;
    // In production, you'd get userId from JWT/session. Here we hardcode:
    const userId = 1;

    await client.query("BEGIN");

    // 1) Insert into Orders table
    const orderQuery = `
      INSERT INTO "Orders" (customer_id, total_cost, status)
      VALUES ($1, $2, 'Pending')
      RETURNING *;
    `;
    const orderResult = await client.query(orderQuery, [userId, grandTotal]);
    const newOrder = orderResult.rows[0];

    // 2) Insert each part into OrderParts table
    for (const part of parts) {
      const quantity = part.quantity || 1;
      const insertPartQuery = `
        INSERT INTO "OrderParts" (order_id, part_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4);
      `;
      await client.query(insertPartQuery, [newOrder.id, part.id, quantity, part.price]);
    }

    await client.query("COMMIT");

    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  } finally {
    client.release();
  }
});

// DELETE /api/orders/:id - permanently remove an order from the DB
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1) Optionally delete associated rows in OrderParts if not using ON DELETE CASCADE
    // await pool.query('DELETE FROM "OrderParts" WHERE order_id = $1;', [id]);

    // 2) Delete from Orders table
    const result = await pool.query('DELETE FROM "Orders" WHERE id = $1;', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
