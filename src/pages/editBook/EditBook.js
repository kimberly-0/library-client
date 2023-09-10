import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getBookById, updateBook } from '../../api/book';
import BookForm from '../../components/bookForm/BookForm';

const EditBook = ({ updateLocalBooks }) => {

    const navigate = useNavigate();

    const params = useParams();
    const bookId = params.bookId;

    const { loading, error, value: book } = useAsync(() => getBookById({ bookId }), [bookId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">Book can not be found</h1>

    const handleSubmit = ({ book }) => {
        return updateBook({ bookId, book: {
            title: book.title,
            authorFirstName: book.authorFirstName,
            authorSurname: book.authorSurname
        } }).then(updatedBook => {
            updateLocalBooks(updatedBook);
            navigate("/books");
        });  
    }

    return (
        <>
            <h2>Update book</h2>

            <BookForm handleSubmit={handleSubmit} initialData={book} />
        </>
    )
}

export default EditBook;