import React from 'react';
import { Book } from '../types';
import { BookOpen, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete, onBorrow, onReturn }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img 
        src={book.coverUrl} 
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          {book.available ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <BookOpen className="w-4 h-4 mr-1" />
          <span>{book.category}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{book.description}</p>
        
        {book.borrowedBy && (
          <div className="mt-2 text-sm text-gray-500">
            <p>Borrowed by: {book.borrowedBy}</p>
            <p>Return date: {book.returnDate}</p>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <button 
            onClick={() => book.available ? onBorrow(book.id) : onReturn(book.id)}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {book.available ? 'Borrow Book' : 'Return Book'}
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="flex-1 flex items-center justify-center px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};