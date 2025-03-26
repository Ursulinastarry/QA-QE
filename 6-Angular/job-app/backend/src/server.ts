import { setupAliases } from "import-aliases";
setupAliases()
import pkg from 'pg';
import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT ;

// app.use("/auth", userRoutes);
app.use(cors({
  origin: "http://localhost:4200",
  methods: "GET, POST,PUT,PATCH,DELETE",
  credentials: true //allows cookies and auth headers
}))
const { Pool } = pkg;
export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
export async function connectClient(): Promise<void> {
  try {
    await pool.connect();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

connectClient();
app.get('/check-name/:name', async (req, res) => {
    try {
      const { name } = req.params;
      const result = await pool.query('SELECT * FROM users WHERE full_name = $1', [name]);
  
      if (result.rows.length > 0) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  });
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

