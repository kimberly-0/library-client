import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getBookById, issueBook } from '../../api/book';
import { getMembers } from '../../api/member';

const IssueBook = ({ updateLocalBooks, updateLocalMembers }) => {

    const navigate = useNavigate();

    const [selectedMemberId, setSelectedMemberId] = useState('');

    const params = useParams();
    const bookId = params.bookId;

    const { loadingBook, errorBook, value: book } = useAsync(() => getBookById({ bookId }), [bookId]);
    const { loadingMembers, errorMembers, value: members } = useAsync(() => getMembers());

    if (loadingBook || loadingMembers ) return <h1>Loading</h1>

    if (errorBook || errorMembers ) return <h1 className="error-msg">Oops, something went wrong</h1>

    const handleChange = e => {
        setSelectedMemberId(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        issueBook({ bookId, userId: selectedMemberId }).then(updatedBook => {
            updateLocalBooks(updatedBook);
            updateLocalMembers(updatedBook.borrower);
            navigate("/books");
        }).catch(err => {
            console.log(err);
        });   
    }

    return (
        <>
            <h3>Issue book</h3>

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
                        </tbody>
                    </table>

                    <div>
                        <p>Issue to</p>

                        {members?.length > 0 ? (
                        <select value={selectedMemberId} onChange={handleChange}>
                            <option value='' disabled>Select member</option>
                            {members.map(member => {
                                // if (member.numOfBooks < 3) {
                                    return (
                                        <option key={member.id} value={member.id}>{member.firstName ? `${member.firstName}` : ""} {member.surname ? `${member.surname}` : ""}</option>
                                    )
                                // } else {
                                //     return null;
                                // }
                            })}
                        </select>
                        ) : (
                            <p>No members found</p>
                        )}
                    </div>

                    <button 
                        onClick={handleSubmit}
                        disabled={loadingMembers || errorMembers || !selectedMemberId
                    }>Confirm</button>
                </>
            ) : (
                <p>No book found</p>
            )}
        </>
    )
}

export default IssueBook;