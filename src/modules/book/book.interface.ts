export type TBook = {
  // id: string;
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
