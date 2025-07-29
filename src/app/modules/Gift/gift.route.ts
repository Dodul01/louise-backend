import express from 'express';
import auth from '../../middlewares/auth';
import { GiftController } from './gift.controller';

const router = express.Router();

router.post('/create-gift-payment', auth('vendor'), GiftController.createGiftPayment);
router.post('/confirm-payment', auth('vendor'), GiftController.confirmPayment);
router.post('/redeem-gift/:gift_id', auth('vendor'), GiftController.redeemGift);

export const GiftRouter = router;