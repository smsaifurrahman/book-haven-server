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
};


const createBookIntoDB = async (bookData: TBook) => {
  const result = await Book.create(bookData);

  return result;
};

const getAllBooksFromDB = async (query: GetAllBooksParams) => {
  // searchTerm: string | undefined,
  // filters: {
  //   priceRange?: { min: number; max: number };
  //   author?: string;
  //   category?: string[];
  //   inStock?: boolean;
  // }

  console.log('query', query);

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
    console.log(minRange);
    console.log(maxRange);

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

  // Execute the Mongoose query
  const result = await Book.find(filter);
  return result;
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
