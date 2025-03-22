import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from "./routes/bookRoutes"

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books",bookRoutes)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});