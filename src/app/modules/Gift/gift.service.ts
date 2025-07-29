import Stripe from "stripe";
import QRCode from "qrcode";
import { GiftModel } from "./gift.model";
import { User } from "../User/user.model";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2025-06-30.basil",
});

// new meta data 
const createGiftPayment = async (data: any) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: `${data.gift_type} Gift for ${data.recipient_name}`,
                    },
                    unit_amount: data.amount * 100,
                },
                quantity: 1,
            },
        ],
        success_url: `http://127.0.0.1:5500/frontend/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://127.0.0.1:5500/frontend/cancel.html`,
        metadata: {
            sender_name: data.sender_name,
            sender_id: data.sender_id,
            recipient_name: data.recipient_name,
            recipient_id: data.recipient_id,
            phone_number: data.phone_number,
            email: data.email || '',
            venue_name: data.venue_name,
            gift_id: data.gift_id,
            gift_type: data.gift_type,
        },
    });

    // Create gift
    const gift = await GiftModel.create({
        ...data,
        sender_id: data.sender_id,
        recipient_id: data.recipient_id,
        venue_id: data.venue_id,
        transaction_id: session.id,
        status: 'pending',
    });

    // increse gift sent
    await User.findByIdAndUpdate(data.sender_id, { $inc: { giftSent: 1 } });
    // increse gift received
    await User.findByIdAndUpdate(data.recipient_id, { $inc: { giftReceived: 1 } });

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(`http://localhost:5000/api/redeem-gift/${gift._id}`);
    await GiftModel.findByIdAndUpdate(gift._id, { qr_code: qrCode });

    return { url: session.url, gift_id: gift._id };
};

const confirmPayment = async (transaction_id: string) => {
    const gift = await GiftModel.findOne({ transaction_id });
    if (!gift) throw new Error("Gift not found");
     console.log("STRIPE_SECRET", process.env.STRIPE_SECRET);
    const qrCode = await QRCode.toDataURL(`http://localhost:5000/api/redeem-gift/${gift._id}`);
    gift.qr_code = qrCode;
    gift.status = "paid";
    await gift.save();

    return gift;
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

export const GiftService = {
    createGiftPayment,
    confirmPayment,
    redeemGift,
    getMySendedGiftsFromDB,
    getMyReceivedGiftsFromDB
}