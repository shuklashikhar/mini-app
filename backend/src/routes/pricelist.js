import express from "express";
import { query } from "../db/index.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await query("SELECT * FROM pricelist ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Pricelist fetch error:", err);
    res.status(500).json({ error: "Failed to load pricelist" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { field, value } = req.body;
  const { id } = req.params;

  const allowedFields = [
    "article_no",
    "product_name",
    "in_price",
    "price",
    "unit",
    "in_stock",
    "description",
    "active",
  ];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ error: "Invalid field" });
  }

  try {
    await query(`UPDATE pricelist SET ${field} = $1 WHERE id = $2`, [
      value,
      id,
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error("Pricelist update error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
