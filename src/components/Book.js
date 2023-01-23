
function Book(props) {
	const { id, bookImg, bookTitle, bookAuthor, removeBook, editBook } = props;

	return (
		<article className='book-card'>
			<img className='book-card__image' src={bookImg} alt='bookcover' />
			<h1 className='book-card__title'>{bookTitle}</h1>
			<h4 className='book-card__author'>{bookAuthor.toUpperCase()}</h4>
			<button className='edit-remove-button' onClick={() => removeBook(id)}>
				Удалить книгу
			</button>
			<button className='edit-remove-button' onClick={() => editBook(id)}>
				Редактировать книгу
			</button>
		</article>
	);
}

export default Book;
