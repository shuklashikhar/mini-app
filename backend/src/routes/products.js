import express from "express";
import { query } from "../db/index.js";
import  authMiddleware  from "../middleware/auth.js";

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, in_price, price, vat, unit } = req.body;

  try {
    await query(
      `
      UPDATE products
      SET name = $1,
          in_price = $2,
          price = $3,
          vat = $4,
          unit = $5
      WHERE id = $6
      `,
      [name, in_price, price, vat, unit, id]
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update product" });
  }
});

export default router;
