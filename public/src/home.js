
const getTotalBooksCount = (books) => books.length;


const getTotalAccountsCount = (accounts) => accounts.length;

function getBooksBorrowedCount(books) {  
let total = books.filter(
  (book) => book.borrows.filter(
    (check) => check.returned === false).length > 0);
  return total.length;
}

function getMostCommonGenres(books) {
 let mapped = {};

 books.forEach((book) => {
  if (mapped[book.genre]) {
   mapped[book.genre]++;
  } else {
   mapped[book.genre] = 1;
  }
 });
 return Object.entries(mapped)
  .map(([name, count]) => {
   return {name,count};
  })
  .sort((varA, varB) => varB.count - varA.count)
  .slice(0, 5);
}



function getMostPopularBooks(books) {
  let result = [];
  const borrows = books.reduce((acc, book) => {
    result.push({ name: book.title, count: book.borrows.length });
  }, []);

  return popularFive(result);
}



function popularFive(array) {
  let result = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return result;
}


function getMostPopularAuthors(books, authors) {
 let lastTotal = [];
  authors.forEach((author) => {
    let sirAuthor = {
      name: `${author.name.first} ${author.name.last}`, count: 0};
    
    books.forEach((book) => {
      if (book.authorId === author.id) {
        sirAuthor.count += book.borrows.length;
      }
    });
    lastTotal.push(sirAuthor);
  });
  return lastTotal.sort((varA, varB) => varB.count - varA.count).slice(0, 5);  
}




module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
