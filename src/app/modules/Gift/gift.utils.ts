import { GiftModel } from "./gift.model";

const validateQr = async (qrData: string): Promise<boolean> => {
    try {
        const gift = await GiftModel.findOne({
            qrCode: qrData,
        });

        console.log(gift);
        

        // // 2. If valid, mark as redeemed
        // if (gift) {
        //     await GiftModel.updateOne(
        //         { _id: gift._id },
        //         { $set: { status: 'redeemed', redeemedAt: new Date() } }
        //     );
        //     return true;
        // }

        return false;
    } catch (error) {
        console.error('QR validation error:', error);
        return false;
    }
};

export default validateQr;