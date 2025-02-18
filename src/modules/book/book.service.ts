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
  category?: string;
  author?: string;
  inStock?: boolean;
  priceRange?: {
    split?: any; min: number; max: number 
};
  page?: string;
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
  if (query?.priceRange) {
    const priceRange = query.priceRange.split('-'); // Split the range like "0-100" into ["0", "100"]
    console.log(priceRange);
    let minRange = 0;
    let maxRange = 0;

    // Handle the different cases of price range:
    if (priceRange.length === 2) {
      minRange = Number(priceRange[0]);
      maxRange = Number(priceRange[1]);
      if (priceRange[0] === '300' && priceRange[1] === 'above') {
        minRange = 300;

        maxRange = 1000000; // If the range is "300-above", set max to a very high value
      }
    }

    console.log(typeof minRange, minRange);
    console.log(typeof maxRange, maxRange);

    filter.price = {
      $gte: minRange, // Greater than or equal to min range
      $lte: maxRange, // Less than or equal to max range
    };
  }

  // Author: Case-insensitive match for author name
  if (query?.author) {
    filter.author = { $regex: query.author, $options: 'i' };
  }

  // Category: Matches any category in the array
  if (query?.category) {
    filter.category = { $in: query.category };
  }

  // In stock: Boolean filter for availability
  if (query?.inStock !== undefined) {
    filter.inStock = query.inStock;
  }

  // Pagination
  const page = Number( query?.page ) || 1; // Default to page 1
  console.log('page', page);
  const limit = query?.limit || 6; // Default to 10 items per page
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
