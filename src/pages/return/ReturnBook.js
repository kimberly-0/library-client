import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getBookById, returnBook } from '../../api/book';
import { getMemberById } from '../../api/member';

const ReturnBook = ({ updateLocalBooks, updateLocalMembers }) => {

    const navigate = useNavigate();

    const params = useParams();
    const bookId = params.bookId;
    const memberId = params.userId;

    const { loadingBook, errorBook, value: book } = useAsync(() => getBookById({ bookId }), [bookId]);
    const { loadingMembers, errorMember, value: member } = useAsync(() => getMemberById({ memberId }), [memberId]);

    if (loadingBook || loadingMembers ) return <h1>Loading</h1>

    if (errorBook || errorMember ) return <h1 className="error-msg">Oops, something went wrong</h1>

    const handleSubmit = e => {
        e.preventDefault();
        returnBook({ bookId }).then(updatedBook => {
            updateLocalBooks(updatedBook);
            getMemberById({ memberId }).then(member => {
                updateLocalMembers(member);
                navigate("/books");
            });
        }).catch(err => {
            console.log(err);
        });   
    }

    return (
        <>
            <h3>Return book</h3>

            {book ? (
                <>
                    <table>
                        <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{book.title}</td>
                            </tr>
                            <tr>
                                <th>Author</th>
                                <td>{book.authorFirstName ? book.authorFirstName : ""} {book.authorSurname ? book.authorSurname : ""}</td>
                            </tr>
                            <tr>
                                <th>Borrower</th>
                                {member ? (
                                    <td>{member.firstName ? `${member.firstName}` : ""} {member.surname ? `${member.surname}` : ""}</td>
                                ) : (
                                    <td>Member not found</td>
                                )}
                            </tr>
                        </tbody>
                    </table>

                    <button 
                        onClick={handleSubmit}
                        disabled={loadingMembers || errorMember || !memberId
                    }>Confirm return</button>
                </>
            ) : (
                <p>No book found</p>
            )}
        </>
    )
}

export default ReturnBook;