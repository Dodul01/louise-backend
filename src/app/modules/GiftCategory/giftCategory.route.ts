import express from 'express';
import auth from '../../middlewares/auth';
import { GiftCategoryController } from './giftCategory.controller';

const router = express.Router();

router.get('/get-gift-category', auth('user'), GiftCategoryController.getGiftCategory);

export const GiftCategoryRouter = router;