import { makeRequest } from './axiosConfig';

export function getBooks() {
  return makeRequest("/books");
}

export function getBookById({ bookId }) {
  return makeRequest(`/books/${bookId}`);
}

export function issueBook({ bookId, userId }) {
  return makeRequest(`/books/${bookId}/issue/${userId}`, {
    method: "PUT"
  });
}

export function returnBook({ bookId }) {
  return makeRequest(`/books/${bookId}/return`, {
    method: "PUT",
  });
}

export function updateBook({ bookId, book }) {
  return makeRequest(`/books/${bookId}`, {
    method: "PUT",
    data: book,
  });
}

export function createBook({ book }) {
  return makeRequest(`/books`, {
    method: "POST",
    data: book,
  });
}

export function deleteBook({ bookId }) {
  return makeRequest(`/books/${bookId}`, {
    method: "DELETE",  
  });
}