import Stripe from 'stripe';
import config from '../../config';
import { GiftModel } from './gift.model';
import AppError from '../../errors/AppError';
import QRCode from "qrcode";

const stripe = new Stripe(config.STRIPE_SECRET as string, {
    apiVersion: '2025-06-30.basil',
});

const createGiftPayment = async (data: any) => {
    const gift = await GiftModel.create({
        ...data,
        status: 'pending',
    });

    return { gift_id: gift._id };
};

const createPaymentIntent = async (giftId: string) => {
    const gift = await GiftModel.findById(giftId);
    if (!gift) throw new AppError(404, 'Gift not found');

    const intent = await stripe.paymentIntents.create({
        amount: Math.round(gift.amount as number * 100),
        currency: 'gbp',
        payment_method_types: ['card'],
        automatic_payment_methods: { enabled: true },
        metadata: {
            gift_id: gift._id.toString(),
            transaction_id: `txn_${gift._id}`
        },
    });

    return { clientSecret: intent.client_secret };
};

// export const savePayment = async (giftId: string, transactionId: string, status: string) => {
//     const gift = await GiftModel.findById(giftId);
//     if (!gift) throw new AppError(404, 'Gift not found');

//     gift.status = status;
//     gift.transaction_id = transactionId;

//     if (status === 'paid') {
//         const qrCode = await QRCode.toDataURL(`QR - {gift._id}`);
//         gift.qr_code = qrCode
//     }

//     await gift.save();
//     return gift;
// };
const savePayment = async (giftId: string, transactionId: string, status: "pending" | "paid" | "redeemed") => {
    const gift = await GiftModel.findById(giftId);
    if (!gift) throw new AppError(404, 'Gift not found');

    gift.status = status;
    gift.transaction_id = transactionId;

    if (status === 'paid') {
        const qrCode = await QRCode.toDataURL(`QR-{gift._id}`);
        gift.qr_code = qrCode
    }

    await gift.save();
    return gift;
};


const handleStripeWebhook = async (event: Stripe.Event) => {
    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent;

        const gift = await GiftModel.findOne({ transaction_id: intent.id });
        if (!gift) return;

        gift.status = 'paid';
        gift.qr_code = await QRCode.toDataURL(`QR-{gift._id}`);
        await gift.save();
    }

    if (event.type === 'payment_intent.payment_failed') {
        const intent = event.data.object as Stripe.PaymentIntent;

        const gift = await GiftModel.findOne({ transaction_id: intent.id });
        if (!gift) return;

        gift.status = 'failed';
        await gift.save();
    }
};


const redeemGift = async (giftId: string) => {
    const gift = await GiftModel.findById(giftId);

    // todo: if jwt token and user id does not match, return an error


    if (!gift) throw new Error("Gift not found");
    if (gift.status === "redeemed") throw new Error("Gift already redeemed");

    gift.status = "redeemed";
    gift.redeemed_at = new Date();
    await gift.save();

    return gift;
};

const getMySendedGiftsFromDB = async (senderId: string) => {
    const sendedGifts = await GiftModel.find({ sender_id: senderId }).sort({ createdAt: -1 });

    // todo: 
    // if user jwt token and the user id does not match, return an error

    return sendedGifts;
}

const getMyReceivedGiftsFromDB = async (recipientId: string) => {
    const receivedGifts = await GiftModel.find({ recipient_id: recipientId }).sort({ createdAt: -1 })
    // todo: 
    // if user jwt token and the user id does not match, return an error

    return receivedGifts;
}

const getSingleGiftFromDB = async (giftId: string) => {
    const gift = await GiftModel.findById(giftId);
    return gift;
}


export const GiftService = {
    createGiftPayment,
    createPaymentIntent,
    savePayment,
    handleStripeWebhook,
    redeemGift,
    getMySendedGiftsFromDB,
    getMyReceivedGiftsFromDB,
    getSingleGiftFromDB
}
