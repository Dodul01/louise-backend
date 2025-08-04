import express from 'express';
import auth from '../../middlewares/auth';
import { GiftController } from './gift.controller';

const router = express.Router();

router.post('/create-gift-payment', auth('vendor'), GiftController.createGiftPayment);
router.post('/create-payment-intent', auth('vendor'), GiftController.createPaymentIntent);
router.post('/save-payment', auth('vendor'), GiftController.savePayment);
router.post('/webhook', express.raw({ type: 'application/json' }), GiftController.stripeWebhook);
router.post('/redeem-gift/:gift_id', auth('vendor'), GiftController.redeemGift);
router.get('/my-gift/:user_id', auth('vendor'), GiftController.getMyReceivedGifts);
router.get('/my-sent-gift/:user_id', auth('vendor'), GiftController.getMySendedGifts);
router.get('/my-single-gift/:giftId', auth('vendor'), GiftController.getSingleGifts);

export const GiftRouter = router;