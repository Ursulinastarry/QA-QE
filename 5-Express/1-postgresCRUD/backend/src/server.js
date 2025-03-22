"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
dotenv_1.default.config();
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));
// const _dirname = path.resolve();
// const bookData = readFileSync(
//   path.join(_dirname, "src", "db", "books.json"),
//   "utf-8"
// );
// const books = JSON.parse(bookData).Books;
// console.log(books)
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
function connectClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.connect();
            console.log("Connected to the database.");
        }
        catch (err) {
            console.error("Error connecting to the database:", err);
        }
    });
}
connectClient();
// GET all books
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT * FROM public.books ORDER BY id ASC");
        const books = result.rows;
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
        // const stats = {
        //   totalBooks: filteredBooks.length,
        //   avgPages: filteredBooks.length 
        //     ? Math.round(filteredBooks.reduce((sum, book) => sum + parseInt(book.pages), 0) / filteredBooks.length)
        //     : 0,
        //   oldestBook: filteredBooks.length 
        //     ? Math.min(...filteredBooks.map(book => parseInt(book.year)))
        //     : null,
        //   uniqueGenres: new Set(filteredBooks.map(book => book.genre)).size
        // };
        res.json(filteredBooks);
    }
    catch (err) {
        console.error("Error getting books:", err);
        res.status(500).json({ error: "Internal server error" });
        console.error("Error filtering books:", err);
        res.status(500).json({ error: "Internal server error" });
    }
    // app.get('/', (req: Request, res: Response) => {
    //   res.send(books)
    // })
}));
// GET a specific book
app.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield pool.query("SELECT * FROM public.books WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({ error: "Book not found" });
        }
    }
    catch (err) {
        console.error("Error getting book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// POST (Create) a new book
app.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, author, genre, year, pages, publisher, description, image, price, } = req.body;
    try {
        yield pool.query(`
      INSERT INTO public.books (id, title, author, genre, year, pages, publisher, description, image, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
            id,
            title,
            author,
            genre,
            year,
            pages,
            publisher,
            description,
            image,
            price,
        ]);
        res.status(201).json({ message: "Book created successfully" });
    }
    catch (err) {
        console.error("Error creating book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// PUT (Replace) an existing book
app.put("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, genre, year, pages, publisher, description, image, price, } = req.body;
    try {
        yield pool.query(`
      UPDATE public.books
      SET title = $1, author = $2, genre = $3, year = $4, pages = $5, publisher = $6, description = $7, image = $8, price = $9
      WHERE id = $10
      `, [
            title,
            author,
            genre,
            year,
            pages,
            publisher,
            description,
            image,
            price,
            id,
        ]);
        res.json({ message: "Book updated successfully" });
    }
    catch (err) {
        console.error("Error updating book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// PATCH (Partial update) an existing book
app.patch("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        let query = "UPDATE public.books SET ";
        const values = [];
        let index = 1;
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                query += `${key} = $${index}, `;
                values.push(updates[key]);
                index++;
            }
        }
        query = query.slice(0, -2);
        query += ` WHERE id = $${index}`;
        values.push(id);
        yield pool.query(query, values);
        res.json({ message: "Book partially updated successfully" });
    }
    catch (err) {
        console.error("Error partially updating book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// DELETE a book
app.delete("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield pool.query("DELETE FROM public.books WHERE id = $1", [id]);
        res.json({ message: "Book deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
