import React from 'react'
import { useState } from 'react'

const AddBookForm = ({ addNewBook }) => {

  const [newBook, setNewBook] = useState({
    bookTitle: '',
    bookAuthor: '',
    bookImg: '',
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewBook({ ...newBook, [name]: value });
  };

  const discardChanges = () => {
    setNewBook({
      bookTitle: '',
      bookAuthor: '',
      bookImg: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewBook(newBook)
    discardChanges();
  }

  return (
    <div className='add-book'>
      <form className='form' onSubmit={handleSubmit}>

        <div>
          <label className='form-label' htmlFor='bookTitle'>Название</label>
          <input
            className='form-input'
            id='bookTitle'
            type='text'
            name='bookTitle'
            value={newBook.bookTitle}
            onChange={handleChange}
            required />
        </div>

        <div>
          <label className='form-label' htmlFor='bookAuthor'>Автор</label>
          <input
            className='form-input'
            id='bookAuthor'
            type='text'
            name='bookAuthor'
            value={newBook.bookAuthor}
            onChange={handleChange}
            required />
        </div>

        <div>
          <label className='form-label' htmlFor='bookImg'>Обложка</label>
          <input
            className='form-input'
            id='bookImg'
            type='text'
            name='bookImg'
            value={newBook.bookImg}
            onChange={handleChange}
            required
          />
        </div>

        <button className='form-button' type='submit'>Добавить книгу</button>
        <button className='form-button' type='button' onClick={discardChanges}>
          Отменить изменения
        </button>

      </form>
    </div>
  )
}

export default AddBookForm