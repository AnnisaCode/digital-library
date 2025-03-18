import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    available: true,
    description: 'A story of decadence and excess.'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0446310789',
    category: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    available: true,
    description: 'The unforgettable novel of a childhood in a sleepy Southern town.'
  },
  {
    id: '3',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '978-0062315007',
    category: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    available: false,
    description: 'A magical story about following your dreams.'
  }
];