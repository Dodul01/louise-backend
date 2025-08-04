import { PrivacyPolicyModel } from "./privacyPolicy.model"

const createPrivacyPolicyIntoDB = async (privacyPolicy: string) => {
    const privacyContent = await PrivacyPolicyModel.create(privacyPolicy);
    return privacyContent;
}

const updatePrivacyPolicyFormDB = async (policyId: string, privacyPolicy: string) => {
    const result = await PrivacyPolicyModel.findByIdAndUpdate(
        policyId,
        { $set: { privacy_policy_content: privacyPolicy } },
        { new: true }
    );

    return result;
}

export const PrivacyService = {
    createPrivacyPolicyIntoDB,
    updatePrivacyPolicyFormDB
}