import express from 'express';
import auth from '../middleware/auth.js';
import { addBook, getBooks, searchBooks } from '../controllers/books.js';

const router = express.Router();

router.post('/books', auth, addBook);  
router.get('/books', getBooks);          // Public: list books
router.get('/search', searchBooks);

export default router;
