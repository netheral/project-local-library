function findAccountById(accounts, id) {
let found = accounts.find((account) => account.id === id);
return found;
}

function sortAccountsByLastName(accounts) {
accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
  return accounts;
}


function getTotalNumberOfBorrows(account, books) {
      const { id: accountId } = account;
      return books.reduce((total, book) => {
       return (total + book.borrows.filter
               (borrow => borrow.id === accountId)
              .reduce((totalBorrows, borrow) => totalBorrows + 1, 0)
        );
    }, 0);
}


function getBooksPossessedByAccount(account, books, authors) {
let finalArray = [];
  let matchCheck = [];
      books.forEach((item) => {
    const borrowed = item.borrows;
    const book = {
       id: item.id,
       title: item.title,
       genre: item.genre,
       authorId: item.authorId,
       author: {},
       borrows: {}
    };
  const { id, title, genre, authorId, author, borrows } = book;

  borrowed.forEach((borrow) => {
   if (borrow.id === account.id 
       && borrow.returned === false) {
     
    finalArray.push(book);
    matchCheck.push(borrow);
    book.borrows = matchCheck;
    book.author = authors.filter((auth) => auth.id === book.authorId)[0];
   
   }
  });
 });
 return finalArray;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
