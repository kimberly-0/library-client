import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getBooks } from './api/book';
import { getMembers } from './api/member';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import IssueBook from './pages/issue/IssueBook';
import ReturnBook from './pages/return/ReturnBook';
import Books from './pages/books/Books';
import AddBook from './pages/addBook/AddBook';
import EditBook from './pages/editBook/EditBook';
import Members from './pages/members/Members';
import AddMember from './pages/addMember/AddMember';
import EditMember from './pages/editMember/EditMember';
import NotFound from './pages/notFound/NotFound';

function App() {

  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getBooks().then(books => setBooks(books)).catch(error => {
      console.log(error);
    });
    getMembers().then(members => setMembers(members)).catch(error => {
      console.log(error);
    });;
  }, [])

  const addLocalBook = (newBook) => {
    setBooks([...books, newBook]);
  }

  const updateLocalBooks = (updatedBook) => {
    setBooks(prevState => {
      const books = [...prevState];
      const index = books.findIndex(book => book.id === updatedBook.id);
      books[index] = updatedBook;
      return books;
    });
  }

  const deleteLocalBook = (bookIdToDelete) => {
    setBooks(books =>
      books.filter(book => book.id !== bookIdToDelete)
    );
  }

  const addLocalMember = (newMember) => {
    setMembers([...members, newMember]);
  }

  const updateLocalMembers = (updatedMember) => {
    setMembers(prevState => {
      const members = [...prevState];
      const index = members.findIndex(member => member.id === updatedMember.id);
      members[index] = updatedMember;
      return members;
    });
  }

  const deleteLocalMember = (memberIdToDelete) => {
    setMembers(members =>
      members.filter(member => member.id !== memberIdToDelete)
    );
  }



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/" element={<Home />} ></Route>

          <Route path="/books" element={<Books books={books} deleteLocalBook={deleteLocalBook} />} ></Route>
          <Route path="/books/:bookId/issue" element={<IssueBook updateLocalBooks={updateLocalBooks} updateLocalMembers={updateLocalMembers} />}></Route>
          <Route path="/books/:bookId/return/:userId" element={<ReturnBook updateLocalBooks={updateLocalBooks} updateLocalMembers={updateLocalMembers} />}></Route>
          <Route path="/books/add" element={<AddBook addLocalBook={addLocalBook} />}></Route>
          <Route path="/books/:bookId/edit" element={<EditBook updateLocalBooks={updateLocalBooks} />}></Route>

          <Route path="/members" element={<Members members={members} deleteLocalMember={deleteLocalMember} />} ></Route>
          <Route path="/members/add" element={<AddMember addLocalMember={addLocalMember} />}></Route>
          <Route path="/members/:memberId/edit" element={<EditMember updateLocalMembers={updateLocalMembers} />}></Route>
          
          <Route path="*" element={<NotFound />} ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
