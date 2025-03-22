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
var _a;
let cartCount = 0;
let cart = [];
function fetchBooks() {
    return __awaiter(this, arguments, void 0, function* (params = {}) {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `http://localhost:4000/books${queryParams ? `?${queryParams}` : ''}`;
            console.log("Fetching books from:", url);
            const response = yield fetch(url);
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching books:", error);
            return [];
        }
    });
}
function displayBooks(books) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const booksList = document.getElementById("booksList");
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
            var _a, _b, _c;
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
            (_a = bookItem.querySelector(".addToCart")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                addToCart(book.title, book.author, book.price);
            });
            // Handle Delete with Confirmation
            (_b = bookItem.querySelector(".delete-icon")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
                if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                    deleteBook(book.id, bookItem);
                }
            });
            // Handle Edit (opens modal)
            (_c = bookItem.querySelector(".edit-icon")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
                openEditModal(book);
            });
        });
        // Function to Delete a Book
        function deleteBook(bookId, bookElement) {
            fetch(`http://localhost:4000/books/${bookId}`, {
                method: "DELETE",
            })
                .then(response => {
                if (!response.ok)
                    throw new Error("Failed to delete book");
                bookElement.remove(); // Remove from UI
            })
                .catch(error => console.error("Error deleting book:", error));
        }
        // Function to Open Edit Modal
        function openEditModal(book) {
            document.getElementById("editBookId").value = book.id;
            document.getElementById("editTitle").value = book.title;
            document.getElementById("editAuthor").value = book.author;
            document.getElementById("editPrice").value = book.price;
            editModal.style.display = "block";
        }
        // Close Edit Modal
        (_a = document.querySelector(".close-modal")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            editModal.style.display = "none";
        });
        // Handle Edit Form Submission
        (_b = document.getElementById("editBookForm")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", (event) => {
            event.preventDefault();
            const bookId = document.getElementById("editBookId").value;
            const updatedBook = {
                title: document.getElementById("editTitle").value,
                author: document.getElementById("editAuthor").value,
                price: parseFloat(document.getElementById("editPrice").value),
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
    });
}
function populateFilters() {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield fetchBooks();
        const genres = new Set();
        books.forEach((book) => genres.add(book.genre));
        const genreFilter = document.getElementById("genreFilter");
        genreFilter.innerHTML = '<option value="">All Genres</option>';
        genres.forEach((genre) => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    });
}
function handleSearch() {
    return __awaiter(this, void 0, void 0, function* () {
        const searchQuery = document.getElementById("searchInput").value.trim();
        const selectedGenre = document.getElementById("genreFilter").value;
        const sortBy = document.getElementById("sortBy").value;
        const params = {};
        if (searchQuery) {
            params.search = searchQuery;
        }
        if (selectedGenre) {
            params.genre = selectedGenre;
        }
        if (sortBy) {
            params.sortBy = sortBy;
        }
        const books = yield fetchBooks(params);
        displayBooks(books);
    });
}
function addToCart(title, author, price) {
    const existingItem = cart.find((item) => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({ title, author, price, quantity: 1 });
    }
    cartCount++;
    updateCartCountDisplay();
}
function updateCartCountDisplay() {
    const cartCountElement = document.getElementById("cartItems");
    if (cartCountElement) {
        cartCountElement.textContent = ` ${cartCount} `;
    }
}
function addCartItems(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield fetchBooks();
        const book = books.find((book) => book.title === title);
        if (!book) {
            console.error(`Book "${title}" not found in JSON data.`);
            return;
        }
        addToCart(book.title, book.author, book.price);
    });
}
function showCartModal() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("showCartModal is running!");
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modalMessage");
        const modalDetails = document.getElementById("modalDetails");
        if (cart.length === 0) {
            modalMessage.innerHTML = "<p>Your cart is empty.</p>";
            modalDetails.innerHTML = "";
        }
        else {
            modalMessage.innerHTML = "<h3>🛍️ Your Cart:</h3>";
            modalDetails.innerHTML = "";
            let totalAmount = 0;
            cart.forEach((cartItem, index) => {
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
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}
function setupEventListeners() {
    var _a, _b, _c;
    const searchInput = document.getElementById("searchInput");
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
    (_a = document.getElementById("genreFilter")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", handleSearch);
    (_b = document.getElementById("sortBy")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", handleSearch);
    // Add event listener for cart
    (_c = document.getElementById("cart")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", showCartModal);
}
const addBookBtn = document.getElementById("addBookBtn");
const bookModal = document.getElementById("bookModal");
const closeModal = document.querySelector(".close");
const successMessage = document.getElementById("successMessage");
(_a = document.getElementById("bookForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const id = parseInt(document.getElementById("id").value, 10);
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = parseInt(document.getElementById("year").value, 10);
    const genre = document.getElementById("genre").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const publisher = document.getElementById("publisher").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const price = parseInt(document.getElementById("price").value, 10);
    const book = { id, title, author, genre, year, pages, publisher, description, image, price };
    try {
        const response = yield fetch("http://localhost:4000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok)
            throw new Error("Failed to add book");
        const newBook = yield response.json();
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
    }
    catch (error) {
        console.error("Error:", error);
    }
}));
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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        // Initial fetch of all books (no filters)
        const books = yield fetchBooks();
        displayBooks(books);
        populateFilters();
        updateCartCountDisplay();
        setupEventListeners();
    });
}
init();
