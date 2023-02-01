import {
	addBooksToLocalStorage,
	getBooksFromLocalStorage,
} from '../utils/localStorage';
import booksArray from '../data/booksArray';

const BookArrayEmpty = ({ setBookData }) => {
	const addBooksToLS = () => {
		addBooksToLocalStorage(booksArray);
		const bookData = getBooksFromLocalStorage();
		setBookData(bookData);
	};

	return (
		<>
			<h1 className="no-books-title">
				Список книг пуст. Вы можете загрузить тестовые данные, используя кнопку
				&laquo;Добавить&raquo; , или воспользоваться формой для добавления книг
				&darr; .{' '}
			</h1>
			<button className="form-button" onClick={addBooksToLS}>
				Добавить
			</button>
		</>
	);
};

export default BookArrayEmpty;
