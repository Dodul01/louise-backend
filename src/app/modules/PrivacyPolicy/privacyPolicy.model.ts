import mongoose from "mongoose";

const privacyPolicySchema = new mongoose.Schema({
    privacy_policy_content: String,
});

export const PrivacyPolicyModel = mongoose.model("PrivacyPolicy", privacyPolicySchema);