"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));
const _dirname = path_1.default.resolve();
const bookData = (0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "books.json"), "utf-8");
const books = JSON.parse(bookData).Books;
console.log(books);
app.get('/api/books', (req, res) => {
    try {
        const { search, genre, year, sortBy } = req.query;
        let filteredBooks = [...books];
        if (search) {
            const searchTerm = search.toLowerCase().trim();
            filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.description.toLowerCase().includes(searchTerm));
        }
        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        }
        if (sortBy === "year") {
            filteredBooks.sort((a, b) => a.year - b.year);
        }
        else if (sortBy === "title") {
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (sortBy === "author") {
            filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
        }
        const stats = {
            totalBooks: filteredBooks.length,
            avgPages: filteredBooks.length
                ? Math.round(filteredBooks.reduce((sum, book) => sum + parseInt(book.pages), 0) / filteredBooks.length)
                : 0,
            oldestBook: filteredBooks.length
                ? Math.min(...filteredBooks.map(book => parseInt(book.year)))
                : null,
            uniqueGenres: new Set(filteredBooks.map(book => book.genre)).size
        };
        res.json(filteredBooks);
    }
    catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get('/', (req, res) => {
    res.send(books);
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
