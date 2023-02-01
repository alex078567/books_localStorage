export const addBooksToLocalStorage = (books) => {
  localStorage.setItem('bookArray', JSON.stringify(books));
}

export const getBooksFromLocalStorage = () => {
  const result = localStorage.getItem('bookArray');
  const bookData = result ? JSON.parse(result) : [];
  return bookData;
}

export const removeBooksFromLocalStorage = () => {
  localStorage.removeItem('bookArray');
}