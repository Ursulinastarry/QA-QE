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
var _a, _b, _c, _d;
let cartCount = 0;
let cart = [];
function updateURL(params) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        }
        else {
            url.searchParams.delete(key);
        }
    });
    window.history.pushState({}, '', url.toString());
    fetchBooks(); // Fetch books based on the updated URL
}
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryParams = new URLSearchParams().toString();
            const url = `http://localhost:4000/api/books${queryParams ? `?${queryParams}` : ''}`;
            const response = yield fetch(url);
            return yield response.json();
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
(_a = document.getElementById('search-input')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', (event) => {
    updateURL({ search: event.target.value });
});
(_b = document.getElementById('sort-select')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', (event) => {
    updateURL({ sort: event.target.value });
});
(_c = document.getElementById('genre-filter')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', (event) => {
    updateURL({ genre: event.target.value });
});
window.addEventListener('load', fetchBooks);
function displayBooks(books) {
    return __awaiter(this, void 0, void 0, function* () {
        const booksList = document.getElementById("booksList");
        booksList.innerHTML = "";
        books.forEach((book) => {
            var _a;
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
        `;
            booksList.appendChild(bookItem);
            (_a = bookItem.querySelector(".addToCart")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                addToCart(book.title, book.author, book.price);
            });
        });
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
            cart.forEach((cartItem) => {
                totalAmount += cartItem.price * cartItem.quantity;
                const cartRow = document.createElement("div");
                cartRow.innerHTML = `
                <p><strong>📖 ${cartItem.title}</strong> by ${cartItem.author} - Ksh ${cartItem.price} x ${cartItem.quantity}</p>
            `;
                modalDetails.appendChild(cartRow);
            });
            const totalElement = document.createElement("p");
            totalElement.innerHTML = `<strong>Total: Ksh ${totalAmount}</strong>`;
            modalDetails.appendChild(totalElement);
        }
        modal.style.display = "flex";
    });
}
(_d = document.getElementById("cart")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", showCartModal);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield fetchBooks();
        displayBooks(books);
        updateCartCountDisplay();
    });
}
init();
