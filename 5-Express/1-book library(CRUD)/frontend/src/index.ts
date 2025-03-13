let cartCount: number = 0;

interface Book {
    id:number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    price: number;
    description: string;
    image: string;
}

interface CartItem {
    title: string;
    author: string;
    price: number;
    quantity: number;
}

let cart: CartItem[] = [];

async function fetchBooks(params: Record<string, string> = {}): Promise<Book[]> {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `http://localhost:4000/books${queryParams ? `?${queryParams}` : ''}`;
        console.log("Fetching books from:", url);
        
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

async function displayBooks(books: Book[]): Promise<void> {
    const booksList = document.getElementById("booksList") as HTMLUListElement;
    booksList.innerHTML = "";

    if (books.length === 0) {
        booksList.innerHTML = "<p>No books found matching your search criteria.</p>";
        return;
    }
    // Create the edit modal
const editModal = document.createElement("div");
editModal.id = "editModal";
editModal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Edit Book</h2>
        <form id="editBookForm">
            <input type="hidden" id="editBookId">
            <label>Title:</label>
            <input type="text" id="editTitle">
            <label>Author:</label>
            <input type="text" id="editAuthor">
            <label>Price:</label>
            <input type="number" id="editPrice">
            <button type="submit">Update</button>
        </form>
    </div>
`;
document.body.appendChild(editModal);
    books.forEach((book) => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book");
        bookItem.title = book.description;
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}"> 
            <div>
                <strong>${book.title}</strong> by ${book.author} <br> 
                Genre: ${book.genre} | Year: ${book.year} | Pages: ${book.pages} <br>
                Price: <strong>${book.price}</strong>
            </div>
            <button class="addToCart" data-title="${book.title}">Add to cart</button>
            <div class="book-actions">
            <span class="edit-icon" title="Edit">✏️</span>
            <span class="delete-icon" title="Delete">❌</span>
        </div>
        `;
        booksList.appendChild(bookItem);

        bookItem.querySelector(".addToCart")?.addEventListener("click", () => {
            addToCart(book.title, book.author, book.price);
        });
    // Handle Delete with Confirmation
    bookItem.querySelector(".delete-icon")?.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
            deleteBook(book.id, bookItem);
        }
    });

    // Handle Edit (opens modal)
    bookItem.querySelector(".edit-icon")?.addEventListener("click", () => {
        openEditModal(book);
    });
});

// Function to Delete a Book
function deleteBook(bookId: number, bookElement: HTMLElement) {
    fetch(`http://localhost:4000/books/${bookId}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete book");
        bookElement.remove(); // Remove from UI
    })
    .catch(error => console.error("Error deleting book:", error));
}

// Function to Open Edit Modal
function openEditModal(book: any) {
    (document.getElementById("editBookId") as HTMLInputElement).value = book.id;
    (document.getElementById("editTitle") as HTMLInputElement).value = book.title;
    (document.getElementById("editAuthor") as HTMLInputElement).value = book.author;
    (document.getElementById("editPrice") as HTMLInputElement).value = book.price;

    editModal.style.display = "block";
}

// Close Edit Modal
document.querySelector(".close-modal")?.addEventListener("click", () => {
    editModal.style.display = "none";
});

// Handle Edit Form Submission
document.getElementById("editBookForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const bookId = (document.getElementById("editBookId") as HTMLInputElement).value;
    const updatedBook = {
        title: (document.getElementById("editTitle") as HTMLInputElement).value,
        author: (document.getElementById("editAuthor") as HTMLInputElement).value,
        price: parseFloat((document.getElementById("editPrice") as HTMLInputElement).value),
    };

    fetch(`http://localhost:4000/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
    })
    .then(response => response.json())
    .then(data => {
        alert("Book updated successfully!");
        editModal.style.display = "none";
        location.reload(); // Refresh page to show updated book
    })
    .catch(error => console.error("Error updating book:", error));
});
}
async function populateFilters(): Promise<void> {
    const books = await fetchBooks();
    const genres = new Set<string>();

    books.forEach((book) => genres.add(book.genre));

    const genreFilter = document.getElementById("genreFilter") as HTMLSelectElement;
    genreFilter.innerHTML = '<option value="">All Genres</option>';
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

async function handleSearch(): Promise<void> {
    const searchQuery = (document.getElementById("searchInput") as HTMLInputElement).value.trim();
    const selectedGenre = (document.getElementById("genreFilter") as HTMLSelectElement).value;
    const sortBy = (document.getElementById("sortBy") as HTMLSelectElement).value;
    
    const params: Record<string, string> = {};
    
    if (searchQuery) {
        params.search = searchQuery;
    }
    
    if (selectedGenre) {
        params.genre = selectedGenre;
    }
    
    if (sortBy) {
        params.sortBy = sortBy;
    }
    
    const books = await fetchBooks(params);
    displayBooks(books);
}

function addToCart(title: string, author: string, price: number): void {
    const existingItem = cart.find((item) => item.title === title);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ title, author, price, quantity: 1 });
    }

    cartCount++;
    updateCartCountDisplay();
}

function updateCartCountDisplay(): void {
    const cartCountElement = document.getElementById("cartItems");
    if (cartCountElement) {
        cartCountElement.textContent = ` ${cartCount} `;
    }
}

async function addCartItems(title: string): Promise<void> {
    const books = await fetchBooks();
    const book = books.find((book) => book.title === title);

    if (!book) {
        console.error(`Book "${title}" not found in JSON data.`);
        return;
    }

    addToCart(book.title, book.author, book.price);
}

async function showCartModal(): Promise<void> {
    console.log("showCartModal is running!");
    const modal = document.getElementById("modal") as HTMLDivElement;
    const modalMessage = document.getElementById("modalMessage") as HTMLDivElement;
    const modalDetails = document.getElementById("modalDetails") as HTMLDivElement;

    if (cart.length === 0) {
        modalMessage.innerHTML = "<p>Your cart is empty.</p>";
        modalDetails.innerHTML = "";
    } else {
        modalMessage.innerHTML = "<h3>🛍️ Your Cart:</h3>";
        modalDetails.innerHTML = "";

        let totalAmount = 0;
        cart.forEach((cartItem,index) => {
            totalAmount += cartItem.price * cartItem.quantity;
            const cartRow = document.createElement("div");
            cartRow.innerHTML = `
 <p><strong>📖 ${cartItem.title}</strong> by ${cartItem.author} - Ksh ${cartItem.price} x ${cartItem.quantity}</p>
                <div class="plus-minus">
                <button class="decrease" data-index="${index}">➖</button>
                <span>${cartItem.quantity}</span>
                <button class="increase" data-index="${index}">➕</button>
                <button class="remove" data-index="${index}">❌ Remove</button>
                </div>            `;
            modalDetails.appendChild(cartRow);
        });
        const totalElement = document.createElement("p");
        totalElement.innerHTML = `<strong>Total: Ksh ${totalAmount}</strong>`;
        modalDetails.appendChild(totalElement);
    }
    modal.style.display = "flex";

     // Close modal when 'X' button is clicked
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target ===modal) {
        modal.style.display = "none";
    }
});
}

function setupEventListeners(): void {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });
    
    // Add search button event listener if you have one
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", handleSearch);
    }
    
    // Add event listeners for filters
    document.getElementById("genreFilter")?.addEventListener("change", handleSearch);
    document.getElementById("sortBy")?.addEventListener("change", handleSearch);
    
    // Add event listener for cart
    document.getElementById("cart")?.addEventListener("click", showCartModal);
    
   
}
const addBookBtn = document.getElementById("addBookBtn") as HTMLButtonElement;
const bookModal = document.getElementById("bookModal") as HTMLDivElement;
const closeModal = document.querySelector(".close") as HTMLSpanElement;
const successMessage = document.getElementById("successMessage") as HTMLElement;


document.getElementById("bookForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = parseInt((document.getElementById("id") as HTMLInputElement).value, 10);
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const author = (document.getElementById("author") as HTMLInputElement).value;
    const year = parseInt((document.getElementById("year") as HTMLInputElement).value, 10);
    const genre = (document.getElementById("genre") as HTMLInputElement).value;
    const pages = parseInt((document.getElementById("pages") as HTMLInputElement).value, 10);
    const publisher = (document.getElementById("publisher") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLInputElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;
    const price = parseInt((document.getElementById("price") as HTMLInputElement).value, 10);

  
    const book = { id, title, author, genre, year,pages,publisher,description,image,price };
  
    try {
      const response = await fetch("http://localhost:4000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
  
      if (!response.ok) throw new Error("Failed to add book");
  
      const newBook = await response.json();
      console.log("Book added:", newBook);
  
      // Refresh books list
      fetchBooks();
  
      // Close modal
       successMessage.textContent = "Book added successfully!";
        successMessage.style.display = "block";

        // Close the modal after a short delay
        setTimeout(() => {
            bookModal.style.display = "none";
            successMessage.style.display = "none"; // Hide message after closing modal
        }, 1500);

    //     // Clear form fields
    //     bookForm.reset();
    //   (document.getElementById("modal") as HTMLElement).style.display = "none";
    } catch (error) {
      console.error("Error:", error);
    }
  });
  

// Show modal when "Add Book" button is clicked
addBookBtn.addEventListener("click", () => {
    bookModal.style.display = "flex";
});

// Close modal when 'X' button is clicked
closeModal.addEventListener("click", () => {
    bookModal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === bookModal) {
        bookModal.style.display = "none";
    }
});

async function init(): Promise<void> {
    // Initial fetch of all books (no filters)
    const books = await fetchBooks();
    displayBooks(books);
    populateFilters();
    updateCartCountDisplay();
    setupEventListeners();
}

init();