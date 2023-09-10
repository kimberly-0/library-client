import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../api/book';
import BookForm from '../../components/bookForm/BookForm';

const AddBook = ({ addLocalBook }) => {

    const navigate = useNavigate();

    const handleSubmit = ({ book }) => {
        return createBook({ book }).then(newBook => {
            addLocalBook(newBook);
            navigate("/books");
        });  
    }

    return (
        <>
            <h2>Add a new book</h2>

            <BookForm handleSubmit={handleSubmit} />
        </>
    )
}

export default AddBook;