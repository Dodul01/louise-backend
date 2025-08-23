import mongoose from "mongoose";

const giftCategorySchema = new mongoose.Schema({
     item_name: String,
     item_description: String,
     item_image: String,
     item_price: String,
});


export const GiftCategory = mongoose.model("Gift Category", giftCategorySchema);

// Default categories
const defaultCategories = [
  {
    item_name: "Coffee",
    item_description: "Freshly brewed coffee",
    item_image: "http://localhost:5001/uploads/Cofee-Icon.png",
    item_price: "10.00",
  },
  {
    item_name: "Latte",
    item_description: "Creamy latte with foam",
    item_image: "http://localhost:5001/uploads/Latte-Icon.png",
    item_price: "10.00",
  },
  {
    item_name: "Pasty",
    item_description: "Delicious sweet pastry",
    item_image: "http://localhost:5001/uploads/Pastry-Icon.png",
    item_price: "10.00",
  },
  {
    item_name: "Cookie",
    item_description: "Crispy chocolate chip cookie",
    item_image: "http://localhost:5001/uploads/Cookies-icon.png",
    item_price: "10.00",
  },
  {
    item_name: "Custom Gift",
    item_description: "Create your own custom gift",
    item_image: "http://localhost:5001/uploads/Coustom-Icon.png",
    item_price: "00.00",
  },
];


export const seedGiftCategories = async () => {
    for(const category of defaultCategories){
        const exists = await GiftCategory.findOne({item_name: category.item_name});

        if(!exists){
            await GiftCategory.create(category);
            console.log(`Created category: ${category.item_name}`);
        }
    }
}