import { useState } from 'react';

const AddBookForm = ({ addNewBook, removeAllBooks }) => {
	const [newBook, setNewBook] = useState({
		bookTitle: '',
		bookAuthor: '',
		bookImg: '',
		bookData: '',
	});

	const [imagePreview, setImagePreview] = useState('');

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const file = e.target?.files ? e.target.files[0] : null;

		if (file) {
			const fileReader = new FileReader();
			setNewBook({ ...newBook, [name]: value });
			fileReader.readAsDataURL(file);
			fileReader.onload = (e) => {
				const bookValue = e.target.result;
				setImagePreview(bookValue);
				setNewBook((book) => {
					book.bookData = bookValue;
					return book;
				});
			};
			return;
		}
		setNewBook({ ...newBook, [name]: value });
	};

	const discardChanges = () => {
		setNewBook({
			bookTitle: '',
			bookAuthor: '',
			bookImg: '',
			bookData: '',
		});
		setImagePreview('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewBook({
			bookTitle: newBook.bookTitle,
			bookAuthor: newBook.bookAuthor,
			bookImg: newBook.bookData,
		});
		discardChanges();
	};

	return (
		<div className="add-book">
			<h2 className="add-book-title">Форма для добавления книг</h2>
			<form className="form" onSubmit={handleSubmit}>
				<div>
					<label className="form-label" htmlFor="bookTitle">
						Название
					</label>
					<input
						className="form-input"
						id="bookTitle"
						type="text"
						name="bookTitle"
						value={newBook.bookTitle}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label className="form-label" htmlFor="bookAuthor">
						Автор
					</label>
					<input
						className="form-input"
						id="bookAuthor"
						type="text"
						name="bookAuthor"
						value={newBook.bookAuthor}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="form-add-book">
					<div className="form-add-book-labels">
						<label className="form-label" htmlFor="bookImg">
							Обложка
						</label>
						<label className="form-file-input" htmlFor="bookImg">
							Выберите файл
						</label>
						<input
							id="bookImg"
							type="file"
							accept="image/*"
							name="bookImg"
							value={newBook.bookImg}
							onChange={handleChange}
							required
							hidden
						/>
					</div>
					<div className="image-preview">
						{imagePreview && <img src={imagePreview} alt="" />}
						{!imagePreview && (
							<p className="image-preview-text">Нет изображения</p>
						)}
					</div>
				</div>

				<button className="form-button" type="submit">
					Добавить книгу
				</button>
				<button className="form-button" type="button" onClick={discardChanges}>
					Отменить изменения
				</button>
			</form>
			<button className="delete-all-button" onClick={removeAllBooks}>
				Удалить все книги
			</button>
		</div>
	);
};

export default AddBookForm;
