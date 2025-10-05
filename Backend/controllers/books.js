import Book from '../models/book.js';
import Review from '../models/review.js';
import mongoose from 'mongoose';

// Add a new book (Authenticated)
export const addBook = async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const createdBy = req.user.userId; // from auth middleware

    const book = new Book({ title, author, genre, description, createdBy });
    await book.save();

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
};

// Get all books with pagination & filters
export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const query = {};

    if (author) query.author = new RegExp(author, 'i'); // case-insensitive partial match
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
};


// Get book details by ID with average rating and paginated reviews
export const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'Invalid book ID' });

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    // Get reviews with pagination
    const reviews = await Review.find({ book: id })
      .populate('user', 'name')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    // Get total reviews count
    const totalReviews = await Review.countDocuments({ book: id });

    // Calculate average rating
    const agg = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(id) } }
,
      { $group: { _id: '$book', avgRating: { $avg: '$rating' } } }
    ]);
    const avgRating = agg.length > 0 ? agg[0].avgRating.toFixed(2) : null;

    res.json({
      book,
      averageRating: avgRating,
      reviews: {
        total: totalReviews,
        page: Number(page),
        limit: Number(limit),
        data: reviews,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book details', error: err.message });
  }
};

// Search books by title or author (case-insensitive, partial match)
export const searchBooks = async (req, res) => {
  try {
    const { q = '' } = req.query;
    const regex = new RegExp(q, 'i'); // 'i' for case-insensitive

    const results = await Book.find({
      $or: [
        { title: regex },
        { author: regex }
      ]
    }).limit(20);

    res.json({ count: results.length, results });
  } catch (err) {
    res.status(500).json({ message: 'Error searching books', error: err.message });
  }
};
