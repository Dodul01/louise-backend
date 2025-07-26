import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserSerialId } from "./user.utils";

const createUserIntoDB = async (user: TUser) => {
    const serialId = await generateUserSerialId();
    const result = await User.create({ ...user, serialId });
    return result;
};

export const UserService = {
    createUserIntoDB,
};