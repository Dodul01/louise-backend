import mongoose from "mongoose";

const termsAndConditionsSchema = new mongoose.Schema({
    terms_and_conditions: String,
});

export const TermsAndConditionsModel = mongoose.model('TermsAndConditions', termsAndConditionsSchema);