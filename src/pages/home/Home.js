import React from 'react';

const getBorrowedBookCount = (books) => {

    if (!books) return 0;

    let totalCount = 0;
    books.forEach(book => {
        if (book.onLoan === true) {
            totalCount++;
        }
    });
    return totalCount;
}

const Home = ({ books, members }) => {

    const borrowedBookCount = getBorrowedBookCount(books);

    return (
        <>
            <p>Borrowed books: {borrowedBookCount}</p>
            <p>Total members: {members.length}</p>
        </>
    )
}

export default Home;