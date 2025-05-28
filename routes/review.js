import express from 'express';
import auth from '../middleware/auth.js';
import { addReview, updateReview, deleteReview } from '../controllers/review.js';

const router = express.Router();

router.post('/books/:id/reviews', auth, addReview); // add review for book
router.put('/reviews/:id', auth, updateReview);     // update own review
router.delete('/reviews/:id', auth, deleteReview);  // delete own review

export default router;
