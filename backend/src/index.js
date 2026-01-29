import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import productsRoutes from "./routes/products.js";
import { query } from "./db/index.js";

const JWT_SECRET = "secretkey";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productsRoutes);

app.get("/health", async (req, res) => {
  try {
    await query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

   if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const result = await query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
