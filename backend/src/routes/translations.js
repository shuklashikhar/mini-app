import express from "express";
import { query } from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lang } = req.query;

  if (!lang) {
    return res.status(400).json({ error: "lang query parameter is required" });
  }

  try {
    const result = await query(
      "SELECT key, value FROM translations WHERE language = $1",
      [lang]
    );

    const translations = {};
    result.rows.forEach(row => {
      translations[row.key] = row.value;
    });

    res.json(translations);
  } catch (err) {
    console.error("Error fetching translations:", err);
    res.status(500).json({ error: "Failed to fetch translations" });
  }
});

export default router;
