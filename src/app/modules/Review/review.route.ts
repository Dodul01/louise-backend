import express from 'express';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-review', auth('vendor'), ReviewController.createReview);

export const ReviewRouter = router;