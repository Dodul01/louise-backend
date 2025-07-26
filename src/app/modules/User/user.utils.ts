import { User } from "./user.model";

const findLastUserId = async () => {
    const lastUser = await User.findOne(
        {},
        { serialId: 1, _id: 0 }
    ).sort({
        createdAt: -1
    }).lean();

    return lastUser?.serialId ? lastUser.serialId : undefined;
};

export const generateUserSerialId = async () => {
    const lastUserId = await findLastUserId();

    let currentId = '000000'; 

    if (lastUserId) {
        const numericId = parseInt(lastUserId, 10) + 1;
        currentId = numericId.toString().padStart(6, '0');
    } else {
        currentId = '000001';
    }

    return currentId;
};