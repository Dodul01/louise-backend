import { TermsAndConditionsModel } from "./TermsAndConditions.model"

const createTermsAndConditionIntoDB = async (termsAndCondition: string) => {
    const TermsAndCondition = await TermsAndConditionsModel.create(termsAndCondition);
    return TermsAndCondition;
}

const updateTermsAndConditionIntoDB = async (termsId: string, termsAndCondition: string) => {
    const TermsAndCondition = await TermsAndConditionsModel.findByIdAndUpdate(
        termsId,
        { $set: { terms_and_conditions: termsAndCondition } },
        { new: true }
    );

    return TermsAndCondition;
}

export const TermsService = {
    createTermsAndConditionIntoDB,
    updateTermsAndConditionIntoDB
}