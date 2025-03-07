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

async function fetchBooks(params: Record<string, string> = {}): Promise<Book[]> {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `http://localhost:4000/api/books${queryParams ? `?${queryParams}` : ''}`;
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
    
    // Close modal functionality if needed
    const closeModalButton = document.getElementById("closeModal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", () => {
            const modal = document.getElementById("modal") as HTMLDivElement;
            modal.style.display = "none";
        });
    }
}

async function init(): Promise<void> {
    // Initial fetch of all books (no filters)
    const books = await fetchBooks();
    displayBooks(books);
    populateFilters();
    updateCartCountDisplay();
    setupEventListeners();
}

init();