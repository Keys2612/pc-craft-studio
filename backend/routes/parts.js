// File: backend/routes/parts.js
const express = require("express");
const router = express.Router();
const { Part } = require("../models");

router.get("/", async (req, res) => {
  try {
    const parts = await Part.findAll();
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
