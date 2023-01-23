import { useRef, useState, useEffect } from 'react';
import booksArray from '../data/booksArray';
import Modal from './Modal';
import Book from './Book';
import AddBookForm from './AddBookForm';
import BookArrayEmpty from './BookArrayEmpty';


function BookList() {

	localStorage.setItem('bookArray', JSON.stringify(booksArray));
	const booksFromStorage = JSON.parse(localStorage.getItem('bookArray'));
	const [bookData, setBookData] = useState(booksFromStorage)
	const [showModal, setShowModal] = useState(false)
	const bookForEdit = useRef({})

	useEffect(() => {
		localStorage.setItem('bookArray', JSON.stringify(bookData));
	})

	const removeBook = (id) => {
		const newData = bookData.filter((book) => book.id !== id)
		newData.map((item, index) => {
			item.id = index + 1;
			return item
		})
		setBookData(newData);
	}

	const editBook = (id) => {
		bookForEdit.current = bookData.filter((book) => book.id === id)
		setShowModal(true)
	}

	const changeBooksArray = (id) => {
		const index = bookData.findIndex((book) => book.id === id)
		const array = bookData
		array[index] = bookForEdit.current[0];
		setBookData(array)
		setShowModal(false)
	}

	const closeModal = () => {
		setShowModal(false);
		bookForEdit.current = {}
	}

	const addNewBook = (book) => {
		const newBook = book
		newBook.id = bookData.length + 1;
		const newBookData = bookData;
		newBookData.push(newBook);
		setBookData([...newBookData])
	}

	return (<>
		<section className='book-list'>
			{showModal && <Modal
				bookForEdit={bookForEdit}
				changeBooksArray={changeBooksArray}
				closeModal={closeModal}
			/>}
			{bookData.length === 0 ? <BookArrayEmpty /> :
				bookData.map((book) => {
					return <Book
						key={book.id}
						{...book}
						removeBook={removeBook}
						editBook={editBook} />;
				})}
		</section>
		<AddBookForm addNewBook={addNewBook} />
	</>
	);
}

export default BookList;
