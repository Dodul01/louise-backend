import { HelpModel } from "./HelpAndSupport.model";
import { IHelpAndSupport } from "./HelpAndSupport.interface";

const createHelpAndSupportIntoDB = async (payload: IHelpAndSupport) => {
    const helpAndSupport = await HelpModel.create(payload);
    return helpAndSupport;
};

const getHelpAndSupportFromDB = async (helpAndSupportId: string) => {
    const helpAndSupport = await HelpModel.findById({ _id: helpAndSupportId });
    return helpAndSupport;
}

const updateHelpAndSupportIntoDB = async (helpAndSupportId: string, payload: IHelpAndSupport) => {
    const updatedPayload: Partial<IHelpAndSupport> = { ...payload };

    if (!payload.image) {
        delete updatedPayload.image;
    }

    const helpAndSupport = await HelpModel.findByIdAndUpdate(
        helpAndSupportId,
        { $set: updatedPayload },
        { new: true }
    );

    return helpAndSupport;
};


export const HelpService = {
    createHelpAndSupportIntoDB,
    getHelpAndSupportFromDB,
    updateHelpAndSupportIntoDB
}