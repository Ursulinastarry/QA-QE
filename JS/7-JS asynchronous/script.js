let cartCount=0
let cart=[]
async function fetchBooks() {
    try {
        const response = await fetch(`http://localhost:3000/Books`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Display books
async function displayBooks(books) {
    const booksList = document.getElementById("booksList");
    booksList.innerHTML = "";

    books.forEach(book => {
        const bookItem = document.createElement("li");
        bookItem.classList.add("book");
        bookItem.title=`${book.description}`
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}"> 
            <div>
                <strong>${book.title}</strong> by ${book.author} <br> 
                Genre: ${book.genre} | Year: ${book.year} | Pages: ${book.pages} <br>
                Price: <strong>${book.price}</strong>
            </div>
            <button class="addToCart">Add to cart</button>
        `;
        booksList.appendChild(bookItem);

        bookItem.querySelector(".addToCart").addEventListener("click",() => {
            addToCart(book.title, book.author, book.price)

            document.querySelectorAll(".addToCart").forEach(button => {
                button.addEventListener("click", event => {
                    const title = event.target.getAttribute("data-title");
            addCartItems(title);
                });
            });
        })
       
    })

    // Get modal and close button
        const modal = document.getElementById("modal");
        const closeButton = document.querySelector(".close");

        // Close modal on click
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when clicking outside it
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

        //Show modal for classic books
    //     if (book.year < 1900) {
    //         showModal(`📖 "${book.title}" is a classic book!`);
    //     }
    // ;

}

// Populate genre filter dynamically
async function populateFilters() {
    const books = await fetchBooks();
    const genres = new Set();

    books.forEach(book => genres.add(book.genre));

    const genreFilter = document.getElementById("genreFilter");
    genreFilter.innerHTML = '<option value="">All</option>';
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });

}

// Apply filters
async function applyFilters() {
    let books = await fetchBooks();
    const selectedGenre = document.getElementById("genreFilter").value.toLowerCase();
    const sortBy = document.getElementById("sortBy").value;
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();

    books = books.filter(book =>
        (selectedGenre === "" || book.genre.toLowerCase() === selectedGenre) &&
        (searchQuery === "" || book.title.toLowerCase().includes(searchQuery))
    );

    // Sort books
    if (sortBy === "year") {
        books.sort((a, b) => a.year - b.year);
    } else if (sortBy === "title") {
        books.sort((a, b) => a.title - b.title);
    }
    else if (sortBy === "author") {
        books.sort((a, b) => a.author.localCompare (b.author));
    }

    displayBooks(books);
}
// function addedBooks(){

// }

    function addToCart(title, author, price) {
        // Check if the book is already in the cart
        const existingItem = cart.find(item => item.title === title);
    
        if (existingItem) {
            existingItem.quantity++; // ✅ Increase quantity if it exists
        } else {
            cart.push({
                title: title,
                author: author,
                price: price,
                quantity: 1 // ✅ New item starts with quantity 1
            });
        }
    
        cartCount++; // Increase cart count
        updateCartCountDisplay();
    }
    



function updateCartCountDisplay(){
    const cartCountElement = document.getElementById("cartItems");
    if(cartCountElement){
  cartCountElement.textContent = ` ${cartCount} `
    }
}
async function addCartItems(title) {
    const books = await fetchBooks(); // Fetch book list
    const book = books.find(book => book.title === title); // Find the selected book

    if (!book) {
        console.error(`Book "${title}" not found in JSON data.`);
        return;
    }

    // Check if book is already in the cart
    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity++; // Increase quantity if already in cart
    } else {
        cart.push({ 
            title: book.title, 
            author: book.author, 
            price: book.price, 
            quantity: 1 
        });
    }

    updateCartCountDisplay();
    console.log("Added to cart:", cart);

}

// Show modal alert
async function showCartModal() {
    console.log("showCartModal is running!")
    const books = await fetchBooks(); // Fetch book data
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    const modalDetails = document.getElementById("modalDetails");

    if (cart.length === 0) {
        modalMessage.innerHTML = "<p>Your cart is empty.</p>";
        modalDetails.innerHTML = "";
    } else {
        modalMessage.innerHTML = "<h3>🛍️ Your Cart:</h3>";
        modalDetails.innerHTML = ""; // Clear previous items

        let totalAmount = 0;

        cart.forEach((cartItem, index) => {
            const book = books.find(b => b.title === cartItem.title); // Match with book data

            if (!book) {
                console.error(`Book "${cartItem.title}" not found in JSON.`);
                return;
            }
            const quantity = cartItem.quantity || 1;
            const price = book.price ?? 0;
            totalAmount += price * quantity;
            
            const cartRow = document.createElement("div");
            cartRow.classList.add("cart-item");
            cartRow.innerHTML = `
                <p><strong>📖 ${book.title}</strong> by ${book.author} - Ksh ${book.price} x ${cartItem.quantity}</p>
                <div class="plus-minus">
                <button class="decrease" data-index="${index}">➖</button>
                <span>${cartItem.quantity}</span>
                <button class="increase" data-index="${index}">➕</button>
                <button class="remove" data-index="${index}">❌ Remove</button>
                </div>
            `;

            modalDetails.appendChild(cartRow);
        });

        // Show total amount
        const totalElement = document.createElement("p");
        totalElement.innerHTML = `<button class="total">Checkout</button>
        <strong>Total: Ksh ${totalAmount}</strong>`;
        modalDetails.appendChild(totalElement);
    }

    modal.style.display = "flex";

    // Attach event listeners to buttons
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            cart[index].quantity++;
            showCartModal();
            addToCart() // Refresh modal
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1); // Remove item if quantity reaches 0
            }
            showCartModal();
            addToCart() // Refresh modal
        });
    });

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1); // Remove item from cart
            showCartModal(); // Refresh modal
        });
    });
    
}


// showCartModal()
// function showCart(){

// }

// Event Listeners
document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("sortBy").addEventListener("change", applyFilters);
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("cart").addEventListener("click",showCartModal)

// Initialize UI
async function init() {
    const books = await fetchBooks();
    displayBooks(books);
    populateFilters();
    updateCartCountDisplay()
}

init();
