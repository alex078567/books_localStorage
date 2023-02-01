import { useEffect } from 'react';
import { useState, useRef } from 'react';

const Modal = ({ bookForEdit, changeBooksArray, closeModal }) => {
	const fileInputRef = useRef(null);
	const [mouseDownOnModal, setMouseDownOnModal] = useState(false);
	const [newBook, setNewBook] = useState({
		...bookForEdit.current[0],
		bookData: bookForEdit.current[0].bookImg,
		bookImg: '',
	});

	const [imagePreview, setImagePreview] = useState(
		bookForEdit.current[0].bookImg
	);

	useEffect(() => {
		const toggleFileInput = () => {
			const data = newBook.bookData;
			const file = new File([data], { type: 'image' });
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);
			fileInputRef.current.files = dataTransfer.files;
		};
		toggleFileInput();
	}, []);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		bookForEdit.current[0] = {
			id: newBook.id,
			bookTitle: newBook.bookTitle,
			bookAuthor: newBook.bookAuthor,
			bookImg: newBook.bookData,
		};
		changeBooksArray(newBook.id);
	};

	const handleClickOutside = () => {
		if (mouseDownOnModal) {
			setMouseDownOnModal(false);
			return;
		}
		closeModal();
	};

	const handleClickOnModal = (e) => {
		setMouseDownOnModal(false);
		e.stopPropagation();
	};

	const handleMouseDownOnModal = (e) => {
		setMouseDownOnModal(true);
		e.stopPropagation();
	};

	return (
		<aside className="modal-container" onClick={handleClickOutside}>
			<form
				className="modal"
				onSubmit={handleSubmit}
				onClick={handleClickOnModal}
				onMouseDown={handleMouseDownOnModal}
			>
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
							ref={fileInputRef}
							id="bookImg"
							type="file"
							accept="image/*"
							name="bookImg"
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
					Сохранить изменения
				</button>
				<button className="form-button" type="button" onClick={closeModal}>
					Отменить изменения
				</button>
			</form>
		</aside>
	);
};

export default Modal;
