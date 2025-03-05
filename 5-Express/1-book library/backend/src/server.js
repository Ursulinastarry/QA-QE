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
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173'
}));
const _dirname = path_1.default.resolve();
const bookData = (0, fs_1.readFileSync)(path_1.default.join(_dirname, "src", "db", "books.json"), "utf-8");
const books = JSON.parse(bookData).Books;
app.get('/api/books', (req, res) => {
    try {
        const { search, genre, yearRange, sortBy } = req.query;
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
        if (yearRange) {
            switch (yearRange) {
                case 'pre-1900':
                    filteredBooks = filteredBooks.filter(book => parseInt(book.year) < 1900);
                    break;
                case '1900-1950':
                    filteredBooks = filteredBooks.filter(book => parseInt(book.year) >= 1900 && parseInt(book.year) <= 1950);
                    break;
                case 'post-1950':
                    filteredBooks = filteredBooks.filter(book => parseInt(book.year) > 1950);
                    break;
            }
        }
        if (sortBy) {
            switch (sortBy) {
                case 'title-asc':
                    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'title-desc':
                    filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'year-asc':
                    filteredBooks.sort((a, b) => parseInt(a.year) - parseInt(b.year));
                    break;
                case 'year-desc':
                    filteredBooks.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                    break;
                case 'pages-asc':
                    filteredBooks.sort((a, b) => parseInt(a.pages) - parseInt(b.pages));
                    break;
                case 'pages-desc':
                    filteredBooks.sort((a, b) => parseInt(b.pages) - parseInt(a.pages));
                    break;
            }
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
        res.json({
            books: filteredBooks,
            stats
        });
    }
    catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get('/', (req, res) => {
    res.json(books);
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
