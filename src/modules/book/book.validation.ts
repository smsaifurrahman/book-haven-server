import { z } from 'zod';

const bookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'), // Ensures non-empty string
  author: z.string().min(1, 'Author is required'), // Ensures non-empty string
  price: z.number().positive('Price must be a positive number'), // Ensures positive number
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]), // Enum for category
  description: z.string().min(1, 'Description is required'), // Ensures non-empty string
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .nonnegative('Quantity cannot be negative'), // Ensures non-negative integer
  inStock: z.boolean(), // Ensures boolean value
  imageUrl: z.string()
});


const updateBookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(), // Optional but must be non-empty if provided
  author: z.string().min(1, 'Author is required').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  category: z
    .enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'])
    .optional(),
  description: z.string().min(1, 'Description is required').optional(),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .nonnegative('Quantity cannot be negative')
    .optional(),
  inStock: z.boolean().optional(),
  imageUrl: z.string().url('Image must be a valid URL').optional(), // Ensures a valid image URL if provided
});

export { bookValidationSchema, updateBookValidationSchema };
