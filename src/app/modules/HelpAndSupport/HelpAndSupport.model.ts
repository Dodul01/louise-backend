import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
})

export const HelpModel = mongoose.model("Help", helpSchema);