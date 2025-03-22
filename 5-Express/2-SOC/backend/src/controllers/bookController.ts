import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import pkg from 'pg';
import dotenv from "dotenv"
const { Pool } = pkg;
dotenv.config()
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
async function connectClient(): Promise<void> {
  try {
    await pool.connect();
    console.log("Connected to the database.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

connectClient();


interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  publisher: string;
  description: string;
  image: string;
  price: number;
}

export const getAllBooks = asyncHandler( async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Book>("SELECT * FROM public.books ORDER BY id ASC");
    const books=result.rows;

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
        ? Math.round(filteredBooks.reduce((sum, book) => sum + book.pages, 0) / filteredBooks.length)
        : 0,
      oldestBook: filteredBooks.length 
        ? Math.min(...filteredBooks.map(book => book.year))
        : null,
      uniqueGenres: new Set(filteredBooks.map(book => book.genre)).size
    };

    res.json(filteredBooks);

  } catch (err) {
    console.error("Error getting books:", err);
    res.status(500).json({ error: "Internal server error" });
    console.error("Error filtering books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query<Book>(
      "SELECT * FROM public.books WHERE id = $1",
      [id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    console.error("Error getting book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const createBook = asyncHandler( async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  try {
    await pool.query<Book>(
      `
      INSERT INTO public.books (id, title, author, genre, year, pages, publisher, description, image, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      [
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
      ]
    );
    res.status(201).json({ message: "Book created successfully" });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    author,
    genre,
    year,
    pages,
    publisher,
    description,
    image,
    price,
  } = req.body;
  try {
    await pool.query(
      `
      UPDATE public.books
      SET title = $1, author = $2, genre = $3, year = $4, pages = $5, publisher = $6, description = $7, image = $8, price = $9
      WHERE id = $10
      `,
      [
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
      ]
    );
    res.json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const partialUpdateBook = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      let query = "UPDATE public.books SET ";
      const values: any[] = [];
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
  
      await pool.query(query, values);
      res.json({ message: "Book partially updated successfully" });
    } catch (err) {
      console.error("Error partially updating book:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const deleteBook = asyncHandler( async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM public.books WHERE id = $1", [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
