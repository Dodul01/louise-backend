import express from 'express';
import auth from '../../middlewares/auth';
import { GiftController } from './gift.controller';

const router = express.Router();

router.post('/create-gift-payment', auth('user'), GiftController.createGiftPayment);
router.post('/create-payment-intent', auth('user'), GiftController.createPaymentIntent);
router.post('/save-payment', auth('user'), GiftController.savePayment);
router.post('/webhook', express.raw({ type: 'application/json' }), GiftController.stripeWebhook);
router.post('/redeem-gift/:gift_id', auth('user'), GiftController.redeemGift);
router.get('/my-gift/:user_id', auth('user'), GiftController.getMyReceivedGifts);
router.get('/my-sent-gift/:user_id', auth('user'), GiftController.getMySendedGifts);
router.get('/my-single-gift/:giftId', auth('user'), GiftController.getSingleGifts);
router.post('/scan-qr', auth('vendor'), GiftController.qrScanner);

export const GiftRouter = router;