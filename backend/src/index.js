import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import translationsRouter from "./routes/translations.js";
import authRouter from "./routes/auth.js";
import { query } from "./db/index.js";
import pricelistRouter from "./routes/pricelist.js";

dotenv.config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/translations", translationsRouter);

app.use("/auth", authRouter);

app.use("/pricelist", pricelistRouter);


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
      process.env.JWT_SECRET ,
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
