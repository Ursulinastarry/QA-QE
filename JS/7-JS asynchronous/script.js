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
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}"> 
            <div>
                <strong>${book.title}</strong> by ${book.author} <br> 
                Genre: ${book.genre} | Year: ${book.year} | Pages: ${book.pages}
            </div>
        `;
        booksList.appendChild(bookItem);

        // Show modal for classic books
        if (book.year < 1900) {
            showModal(`📖 "${book.title}" is a classic book!`);
        }
    });
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
    } else if (sortBy === "pages") {
        books.sort((a, b) => a.pages - b.pages);
    }

    displayBooks(books);
}

// Show modal alert
function showModal(message) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerText = message;
    modal.style.display = "flex";

    document.querySelector(".close").onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Event Listeners
document.getElementById("genreFilter").addEventListener("change", applyFilters);
document.getElementById("sortBy").addEventListener("change", applyFilters);
document.getElementById("searchInput").addEventListener("input", applyFilters);

// Initialize UI
async function init() {
    const books = await fetchBooks();
    displayBooks(books);
    populateFilters();
}

init();
