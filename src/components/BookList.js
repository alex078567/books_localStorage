import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from './Modal';
import Book from './Book';
import AddBookForm from './AddBookForm';
import BookArrayEmpty from './BookArrayEmpty';
import {
	removeBooksFromLocalStorage,
	getBooksFromLocalStorage,
} from '../utils/localStorage';

function BookList() {
	const booksFromStorage = getBooksFromLocalStorage();
	const [bookData, setBookData] = useState(booksFromStorage);
	const [showModal, setShowModal] = useState(false);
	const bookForEdit = useRef({});

	useEffect(() => {
		if (bookData.length === 0) {
			removeBooksFromLocalStorage();
			return;
		}
		localStorage.setItem('bookArray', JSON.stringify(bookData));
	});

	const removeBook = (id) => {
		const newData = bookData.filter((book) => book.id !== id);
		setBookData(newData);
	};

	const removeAllBooks = () => {
		setBookData([]);
	};

	const editBook = (id) => {
		bookForEdit.current = bookData.filter((book) => book.id === id);
		setShowModal(true);
	};

	const changeBooksArray = (id) => {
		const index = bookData.findIndex((book) => book.id === id);
		const array = bookData;
		array[index] = bookForEdit.current[0];
		setBookData(array);
		setShowModal(false);
	};

	const closeModal = () => {
		setShowModal(false);
		bookForEdit.current = {};
	};

	const addNewBook = (book) => {
		const newBook = book;
		newBook.id = uuidv4();
		const newBookData = bookData;
		newBookData.push(newBook);
		setBookData([...newBookData]);
	};

	return (
		<>
			<section className="book-list">
				{showModal && (
					<Modal
						bookForEdit={bookForEdit}
						changeBooksArray={changeBooksArray}
						closeModal={closeModal}
					/>
				)}

				{bookData.length === 0 ? (
					<BookArrayEmpty setBookData={setBookData} />
				) : (
					bookData.map((book) => {
						return (
							<Book
								key={book.id}
								{...book}
								removeBook={removeBook}
								editBook={editBook}
							/>
						);
					})
				)}
			</section>
			<AddBookForm addNewBook={addNewBook} removeAllBooks={removeAllBooks} />
		</>
	);
}

export default BookList;
