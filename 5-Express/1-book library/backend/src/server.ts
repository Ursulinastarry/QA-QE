import express from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT ;

// Enable CORS if needed
app.use(cors({
    origin: "http://localhost:5173", // Adjust if necessary
    methods: "GET, PUT, DELETE",
    credentials: true
}));
const __dirname=path.resolve()
// Serve static files (HTML, CSS, JS) from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Read books.json

const books = readFileSync(path.join(__dirname, "src","db", "books.json"), "utf-8");
const booksFromFile = JSON.parse(books);



// Serve the main HTML page instead of JSON
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// API to get books (for frontend JavaScript)
app.get("/api/books", (req, res) => {
    res.send(books);});
    
    app.get("/books", (req, res) => {
        res.json({ message: "Hello, world!" });
    });
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
