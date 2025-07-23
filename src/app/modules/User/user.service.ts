import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
    try {
        const result = await User.create(user);

        return result;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const UserService = {
    createUserIntoDB,
};
