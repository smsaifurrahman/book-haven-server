export type TBook = {
  // id: string;
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
