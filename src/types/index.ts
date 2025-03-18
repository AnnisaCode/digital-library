export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  coverUrl: string;
  available: boolean;
  description: string;
  borrowedBy?: string;
  borrowedDate?: string;
  returnDate?: string;
}

export type BookFormData = Omit<Book, 'id' | 'available'>;

export interface User {
  id: string;
  name: string;
  email: string;
  borrowedBooks: string[];
}