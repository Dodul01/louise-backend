import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GiftService } from './gift.service';
import config from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_SECRET as string, {
    apiVersion: '2025-06-30.basil',
});

export const GiftController = {
    // 1. Save gift info only
    createGiftPayment: catchAsync(async (req: Request, res: Response) => {
        const result = await GiftService.createGiftPayment(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Gift created successfully.',
            data: result,
        });
    }),

    // 2. Create Stripe PaymentIntent
    createPaymentIntent: catchAsync(async (req: Request, res: Response) => {
        const { gift_id } = req.body;
        const result = await GiftService.createPaymentIntent(gift_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Payment intent created.',
            data: result,
        });
    }),

    // 3. Save final payment after frontend success
    savePayment: catchAsync(async (req: Request, res: Response) => {
        const { gift_id, transactionId, status } = req.body;
        const result = await GiftService.savePayment(gift_id, transactionId, status);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Payment saved and gift updated.',
            data: result,
        });
    }),

    // 4. Stripe webhook handler
    stripeWebhook: catchAsync(async (req: Request, res: Response) => {
        const sig = req.headers['stripe-signature'];
        const webhookSecret = config.STRIPE_WEBHOOK_SECRET;

        if (!sig) {
            return res.status(400).send('Missing Stripe signature');
        }

        if (!webhookSecret) {
            return res.status(400).send('Missing Stripe signature');
        }

        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        } catch (err: any) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        await GiftService.handleStripeWebhook(event);

        res.status(httpStatus.OK).json({ received: true });
    }),

    // 5. Redeem gift (e.g. via QR scan)
    redeemGift: catchAsync(async (req: Request, res: Response) => {
        const { gift_id } = req.params;
        const result = await GiftService.redeemGift(gift_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Gift redeemed successfully.',
            data: result,
        });
    }),

    // 6. View sent gifts
    getMySendedGifts: catchAsync(async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const result = await GiftService.getMySendedGiftsFromDB(user_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Sent gifts fetched successfully.',
            data: result,
        });
    }),

    // 7. View received gifts
    getMyReceivedGifts: catchAsync(async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const result = await GiftService.getMyReceivedGiftsFromDB(user_id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Received gifts fetched successfully.',
            data: result,
        });
    }),

    // 8. View all gifts
    getSingleGifts: catchAsync(async (req: Request, res: Response) => {
        const giftId = req.params.giftId;
        const result = await GiftService.getSingleGiftFromDB(giftId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Gift fetched successfully.',
            data: result,
        });
    }),

    // 9. QR Scanner
    qrScanner: catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await GiftService.scanQRFromDB(payload);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'QR code scaned successfully.',
            data: result,
        });
    })
}