
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
function updateURL(params: Record<string, string | null>) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
    });
    window.history.pushState({}, '', url.toString());
    fetchBooks(); // Fetch books based on the updated URL
}

async function fetchBooks(): Promise<Book[]> {
    try {
        const queryParams=new URLSearchParams()  .toString();
        const url=`http://localhost:4000/api/books${queryParams ? `?${queryParams}`: ''}`                                                                                                                                  
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

document.getElementById('search-input')?.addEventListener('input', (event) => {
    updateURL({ search: (event.target as HTMLInputElement).value });
});

document.getElementById('sort-select')?.addEventListener('change', (event) => {
    updateURL({ sort: (event.target as HTMLSelectElement).value });
});

document.getElementById('genre-filter')?.addEventListener('change', (event) => {
    updateURL({ genre: (event.target as HTMLSelectElement).value });
});

window.addEventListener('load', fetchBooks);

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


document.getElementById("cart")?.addEventListener("click", showCartModal);

async function init(): Promise<void> {
    const books = await fetchBooks();
    displayBooks(books);
   
    updateCartCountDisplay();
}

init();
