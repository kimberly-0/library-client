import "./Books.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteBook } from '../../api/book';

const Books = ({ books, deleteLocalBook }) => {

    const handleDelete = book => {
        if (book.borrower != null) {
            console.log("Cannot delete since book is currently on loan");
        } else {
            if (window.confirm(`Are you sure you want to delete the book ${book.title} by ${book.authorSurname}?`)) {
                deleteBook({ bookId: book.id }).then(() => {
                    deleteLocalBook(book.id);
                }).catch(err => {
                    console.log(err);
                }); 
            } else {
                console.log("Book not deleted");
            }            
        }  
    };

    return (
        <>
            <Link to={'/books/add'} className="add-new-button">Add new book</Link>

            {books?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>On loan</th>
                            <th>Borrower</th>
                            <th>Issue/Return</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.id}>
                                <td>{book.coverImageURL ? 
                                    <img className="bookCoverImg" src={book.coverImageURL} alt={book.title} /> 
                                    : 
                                    <p className="noImg">No image available</p>}
                                </td>
                                <td>{book.title ? book.title : ""}</td>
                                <td>{book.authorFirstName ? book.authorFirstName : ""} {book.authorSurname ? book.authorSurname : ""}</td>
                                <td>{book.onLoan ? "yes" : "no"}</td>
                                <td>{book.borrower?.firstName ? `${book.borrower.firstName}` : ""} {book.borrower?.surname ? `${book.borrower.surname}` : ""}</td>
                                <td>{book.onLoan ? 
                                    <Link to={`/books/${book.id}/return/${book.borrower.id}`} className="action-button">Return</Link> 
                                    : 
                                    <Link to={`/books/${book.id}/issue`} className="action-button">Issue</Link>
                                }</td>
                                <td><Link to={`/books/${book.id}/edit`} className="action-button">Edit</Link></td>
                                <td><button onClick={() => handleDelete(book)} className="action-button delete-button">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books found</p>
            )}
        </>
    )
}

export default Books;