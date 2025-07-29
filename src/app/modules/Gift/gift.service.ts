import Stripe from "stripe";
import QRCode from "qrcode";
import { GiftModel } from "./gift.model";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2025-06-30.basil",
});

//  OLD ONE 
// const createGiftPayment = async (data: any) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: data.amount * 100,
//         currency: "gbp",
//         payment_method_types: ["card"],
//     });

//     const gift = await GiftModel.create({
//         ...data,
//         status: "pending",
//         transaction_id: paymentIntent.id,
//     });

//     return {
//         client_secret: paymentIntent.client_secret,
//         gift_id: gift._id,
//     };
// };

// NEW code for web 

// old meta data 
// const createGiftPayment = async (data: any) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'gbp',
//                     product_data: {
//                         name: `${data.gift_type} Gift for ${data.recipient_name}`,
//                     },
//                     unit_amount: data.amount * 100,
//                 },
//                 quantity: 1,
//             },
//         ],
//         success_url: `http://127.0.0.1:5500/frontend/success.html?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `http://127.0.0.1:5500/frontend/cancel.html`,
//         metadata: {
//             sender_name: data.sender_name,
//             recipient_name: data.recipient_name,
//             phone_number: data.phone_number,
//             email: data.email || '',
//             venue_name: data.venue_name,
//             venue_id: data.venue_id,
//             gift_type: data.gift_type,
//         },
//     });

//     console.log(data);


//     // Save pending gift in DB with session.id
//     const gift = await GiftModel.create({
//         ...data,
//         venue_id: data.venue_id,
//         transaction_id: session.id,
//         status: 'pending',
//     });
//     // generate qr code 
//     const qrCode: any = await QRCode.toDataURL(`http://localhost:5000/api/redeem-gift/${gift._id}`);

//     await GiftModel.findByIdAndUpdate(gift._id, { qr_code: qrCode })


//     return { url: session.url, gift_id: gift._id };
// };


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
    if (!gift) throw new Error("Gift not found");
    if (gift.status === "redeemed") throw new Error("Gift already redeemed");

    gift.status = "redeemed";
    gift.redeemed_at = new Date();
    await gift.save();

    return gift;
};


export const GiftService = {
    createGiftPayment,
    confirmPayment,
    redeemGift
}