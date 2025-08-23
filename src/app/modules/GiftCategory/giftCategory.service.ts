import { GiftCategory } from "./giftCategory.model";

const getGiftCategoryFromDB = async () => {
    const giftCategories = await GiftCategory.find();
    return giftCategories;
}

export const GiftCategoryServices = {
    getGiftCategoryFromDB,
}