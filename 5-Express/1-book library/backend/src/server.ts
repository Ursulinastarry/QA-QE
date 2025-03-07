import express from "express";
import type { Request, Response } from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cors())

// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

const _dirname = path.resolve();

const bookData = readFileSync(
  path.join(_dirname, "src", "db", "books.json"),
  "utf-8"
);

const books = JSON.parse(bookData).Books;
console.log(books)


app.get('/api/books', (req: Request, res: Response) => {
    try {
    const { 
      search, 
      genre, 
      year, 
      sortBy 
    } = req.query;

    let filteredBooks = [...books];

    if (search) {
      const searchTerm = (search as string).toLowerCase().trim();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm)
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase() === (genre as string).toLowerCase()
      );
    }

    
    if (sortBy === "year") {
      filteredBooks.sort((a, b) => a.year - b.year);
  } else if (sortBy === "title") {
      filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "author") {
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

  } catch (error) {
    console.error("Error filtering books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get('/', (req: Request, res: Response) => {
  res.send(books)
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});