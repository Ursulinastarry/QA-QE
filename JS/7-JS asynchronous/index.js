import chalk from "chalk";
async function fetchBooks(callbackFn) {
    try {
        const response = await fetch(`http://localhost:3000/Books`)
        const jsonData = await response.json();
        //console.log(jsonData)
        const books=jsonData
        callbackFn(books)
      }
     catch (error) {
      console.error(error);
    }
}
  function booksNeeded(genre, pages, books) {
    books.filter((book) => {
      if (book.genre === genre || book.pages > pages) {
        console.log(`${book.title}\n Pages:${book.pages}\n Caution: this is a ${book.genre} book`);
      }

    });
  }
  
 fetchBooks((books) => booksNeeded("Romance", 1000, books));

 function mapped(books){
    console.log(chalk.yellow("mapping"))

  books.map((book)=>{
    console.log(`${book.title} by${book.author} - ${book.genre} (${book.pages})`);

  })
  console.log(chalk.bgBlueBright("done"))

 }
 fetchBooks((books)=>mapped(books))

 function filtered(books){
    console.log(chalk.green("filtering"))

    books.filter((book)=>{
        if(book.year<1900){
      console.log(`${book.title} by ${book.author} published in ${book.year} `);

        }

    })
    console.log(chalk.bgBlueBright("done"))

   }
   fetchBooks((books)=>filtered(books))

 function sorted(books){
    console.log(chalk.blue("sorting"))

    books.sort((a,b)=>( a.year-b.year)) 
    books.forEach((book)=>{
        console.log(`${book.title} by ${book.author} published in ${book.year} `);

    })
    console.log(chalk.bgBlueBright("done"))
}
    
   fetchBooks((books)=>sorted(books))

  