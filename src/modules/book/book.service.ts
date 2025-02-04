import { TBook } from './book.interface';
import { Book } from './book.model';

type BookFilters = {
  priceRange?: { min: number; max: number };
  author?: string;
  category?: string[];
  inStock?: boolean;
};

type GetAllBooksParams = {
  searchTerm?: string;
  filters?: BookFilters;
  page?: number;
  limit?: number;
};

const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);

  return result;
};

const getAllBooksFromDB = async (query: GetAllBooksParams) => {
  const filter: any = {}; // Initialize the filter object

  // Search term: Applies $or condition
  let searchTerm;
  if (query?.searchTerm) {
    searchTerm = query.searchTerm;
    filter.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { author: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  // Price range: Applies $gte and $lte for price
  if (query?.filters?.priceRange) {
    const minRange = Number(query.filters.priceRange.min);
    const maxRange = Number(query.filters.priceRange.max);
    filter.price = {
      $gte: minRange,
      $lte: maxRange,
    };
  }

  // Author: Case-insensitive match for author name
  if (query?.filters?.author) {
    filter.author = { $regex: query.filters.author, $options: 'i' };
  }

  // Category: Matches any category in the array
  if (query?.filters?.category) {
    filter.category = { $in: query.filters.category };
  }

  // In stock: Boolean filter for availability
  if (query?.filters?.inStock !== undefined) {
    filter.inStock = query.filters.inStock;
  }

  // Pagination
  const page = query?.page || 1; // Default to page 1
  const limit = query?.limit || 10; // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate documents to skip

  // Execute the Mongoose query with pagination
  const result = await Book.find(filter).skip(skip).limit(limit);

  // Total count for the filtered query
  const totalCount = await Book.countDocuments(filter);

  return {
    data: result, // Paginated results
    meta: {
      totalCount, // Total number of documents matching the filter
      totalPages: Math.ceil(totalCount / limit), // Total number of pages
      currentPage: page,
    },
  };
};

const getSingleBookFromDB = async (id: string) => {
  const result = await Book.findById(id);

  return result;
};

const updateBookFromDB = async (id: string, data: TBook) => {
  const result = Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteBookFromDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
};
