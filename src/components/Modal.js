import React from 'react'
import { useState } from 'react';

const Modal = ({ bookForEdit, changeBooksArray, closeModal }) => {

  const [newBook, setNewBook] = useState(bookForEdit.current[0])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewBook({ ...newBook, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    bookForEdit.current[0] = newBook;
    changeBooksArray(newBook.id)
  }

  return (
    <aside className='modal-container' onClick={() => {
      closeModal()
    }}>
      <form className='modal' onSubmit={handleSubmit} onClick={(e) => {
        e.stopPropagation();
      }}>

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
        <button className='form-button' type='submit'>
          Сохранить изменения
        </button>
        <button className='form-button' type='button' onClick={closeModal}>
          Отменить изменения
        </button>
      </form>
    </aside>
  )
}

export default Modal