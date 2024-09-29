import { useState, useEffect } from 'react';

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', genre: '' });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    // Fetch books when the component mounts
    fetch('http://localhost:8080/api/v1/book/getBooks')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/v1/book/addBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(data => {
        setBooks([...books, data]);
        setNewBook({ title: '', author: '', isbn: '', genre: '' });
      })
      .catch(error => console.error('Error adding book:', error));
  };

  const handleUpdateBook = (id) => {
    fetch(`http://localhost:8080/api/v1/book/updateBook/${id}`, { // use backticks for template literal
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
      .then(response => response.json())
      .then(updatedBook => {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
        setNewBook({ title: '', author: '', isbn: '', genre: '' });
        setEditingBook(null);
      })
      .catch(error => console.error('Error updating book:', error));
  };

  const handleEditBook = (book) => {
    setNewBook({ title: book.title, author: book.author, isbn: book.isbn, genre: book.genre });
    setEditingBook(book.id);
  };

  const handleDeleteBook = (id) => {
    fetch(`http://localhost:8080/api/v1/book/delete/${id}`, { // use backticks for template literal
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setBooks(books.filter(book => book.id !== id));
        }
      })
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="mb-4">
      <h2>Book Details</h2>
      <form onSubmit={editingBook ? (e) => { e.preventDefault(); handleUpdateBook(editingBook); } : handleAddBook} className="mb-3">
        <div className="mb-3">
          <label htmlFor="bookTitle" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="bookTitle"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookAuthor" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="bookAuthor"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            value={newBook.isbn}
            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.genre}</td>
              <td>
                <button onClick={() => handleEditBook(book)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDeleteBook(book.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookDetails;
