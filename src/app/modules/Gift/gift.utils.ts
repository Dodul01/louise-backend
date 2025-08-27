import { GiftModel } from "./gift.model";

// const validateQr = async (qrData: string): Promise<boolean> => {
//     try {
//         const gift = await GiftModel.findOne({
//             qrCode: qrData,
//         });

//         console.log(gift);


//         // 2. If valid, mark as redeemed
//         if (gift) {
//             await GiftModel.updateOne(
//                 { _id: gift._id },
//                 { $set: { status: 'redeemed', redeemedAt: new Date() } }
//             );
//             return true;
//         }

//         return false;
//     } catch (error) {
//         console.error('QR validation error:', error);
//         return false;
//     }
// };


const validateQr = async (qrData: string): Promise<boolean> => {
    try {
        // qrData is expected like: "QR-<base64EncodedGiftId>"
        console.log(qrData);

        // if (!qrData.startsWith('QR-')) {
        //     console.error('Invalid QR format');
        //     return false;
        // }

        const encodedId = qrData.replace('QR-', ''); // remove "QR-" prefix
        console.log(encodedId);

        const decodedId = Buffer.from(encodedId, 'base64').toString(); // decode Base64

        console.log("Decoded Gift ID:", decodedId);

        // Find the gift by _id (decoded)
        const gift = await GiftModel.findById(decodedId);

        console.log("Gift from DB:", gift);

        // If gift exists and not redeemed, mark as redeemed
        if (gift && gift.status !== 'redeemed') {
            gift.status = 'redeemed';
            gift.redeemed_at = new Date();
            await gift.save();
            return true;
        }

        return false;
    } catch (error) {
        console.error('QR validation error:', error);
        return false;
    }
};

export default validateQr;