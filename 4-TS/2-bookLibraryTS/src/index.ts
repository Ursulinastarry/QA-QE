let cartCount: number = 0;

interface Book {
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

async function fetchBooks(): Promise<Book[]> {
    try {
        const response = await fetch(`http://localhost:3000/Books`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function displayBooks(books: Book[]): Promise<void> {
    const booksList = document.getElementById("booksList") as HTMLUListElement;
    booksList.innerHTML = "";

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
        `;
        booksList.appendChild(bookItem);

        bookItem.querySelector(".addToCart")?.addEventListener("click", () => {
            addToCart(book.title, book.author, book.price);
        });
    });
}

async function populateFilters(): Promise<void> {
    const books = await fetchBooks();
    const genres = new Set<string>();

    books.forEach((book) => genres.add(book.genre));

    const genreFilter = document.getElementById("genreFilter") as HTMLSelectElement;
    genreFilter.innerHTML = '<option value="">All</option>';
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

async function applyFilters(): Promise<void> {
    let books = await fetchBooks();
    const selectedGenre = (document.getElementById("genreFilter") as HTMLSelectElement).value.toLowerCase();
    const sortBy = (document.getElementById("sortBy") as HTMLSelectElement).value;
    const searchQuery = (document.getElementById("searchInput") as HTMLInputElement).value.toLowerCase();

    books = books.filter((book) =>
        (selectedGenre === "" || book.genre.toLowerCase() === selectedGenre) &&
        (searchQuery === "" || book.title.toLowerCase().includes(searchQuery))
    );

    if (sortBy === "year") {
        books.sort((a, b) => a.year - b.year);
    } else if (sortBy === "title") {
        books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "author") {
        books.sort((a, b) => a.author.localeCompare(b.author));
    }

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
}

document.getElementById("genreFilter")?.addEventListener("change", applyFilters);
document.getElementById("sortBy")?.addEventListener("change", applyFilters);
document.getElementById("searchInput")?.addEventListener("input", applyFilters);
document.getElementById("cart")?.addEventListener("click", showCartModal);

async function init(): Promise<void> {
    const books = await fetchBooks();
    displayBooks(books);
    populateFilters();
    updateCartCountDisplay();
}

init();
