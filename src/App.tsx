import React, { useState } from 'react';
import { Library, PlusCircle } from 'lucide-react';
import { books as initialBooks } from './data/books';
import { BookCard } from './components/BookCard';
import { SearchBar } from './components/SearchBar';
import { BookForm } from './components/BookForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Book, BookFormData } from './types';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('library-books', initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBook = (data: BookFormData) => {
    const newBook: Book = {
      ...data,
      id: crypto.randomUUID(),
      available: true,
    };
    setBooks([...books, newBook]);
    setShowForm(false);
  };

  const handleEditBook = (data: BookFormData) => {
    if (!editingBook) return;
    const updatedBooks = books.map(book =>
      book.id === editingBook.id ? { ...book, ...data } : book
    );
    setBooks(updatedBooks);
    setEditingBook(null);
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleBorrowBook = (id: string) => {
    const name = window.prompt('Enter your name:');
    if (!name) return;

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14); // 2 weeks from now

    setBooks(books.map(book =>
      book.id === id ? {
        ...book,
        available: false,
        borrowedBy: name,
        borrowedDate: new Date().toISOString(),
        returnDate: returnDate.toISOString()
      } : book
    ));
  };

  const handleReturnBook = (id: string) => {
    setBooks(books.map(book =>
      book.id === id ? {
        ...book,
        available: true,
        borrowedBy: undefined,
        borrowedDate: undefined,
        returnDate: undefined
      } : book
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Library className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Digital Library</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-5 h-5 mr-1" />
              Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={setEditingBook}
              onDelete={handleDeleteBook}
              onBorrow={handleBorrowBook}
              onReturn={handleReturnBook}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching your search criteria.</p>
          </div>
        )}
      </main>

      {(showForm || editingBook) && (
        <BookForm
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
          initialData={editingBook || undefined}
        />
      )}

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Digital Library. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;