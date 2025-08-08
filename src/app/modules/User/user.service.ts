import { io } from "../../../server";
import { sendAdminNotification } from "../../helper/socketHelper";
import { NotificationService } from "../Notification/notification.service";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateUserSerialId } from "./user.utils";

const createUserIntoDB = async (user: TUser) => {
    const serialId = await generateUserSerialId();
    const result = await User.create({ ...user, serialId });
    return result;
};

const getAllUsers = async () => {
    const users = await User.find({}).sort({ createdAt: -1 });
    return users;
}

const getSingleUserForDB = async (userId: string) => {
    const user = await User.findOne({ _id: userId });
    return user;
}

const blockUserFormDB = async (userId: string) => {
    const result = await User.findByIdAndUpdate(
        userId,
        { $set: { isBlocked: true } },
        { new: true }
    );

    if (result) {
        // create notification and send it to admin
        NotificationService.createNotificationIntoDB({
            title: 'User Blocked',
            message: `You blocked ${result?.name} successfully.`,
            reciver: 'admin',
        });

        sendAdminNotification(io, {
            title: "User Blocked",
            message: `You blocked ${result?.name} successfully.`,
        })
    }

    return result;
}

const unblockUserFormDB = async (userId: string) => {
    const result = await User.findByIdAndUpdate(
        userId,
        { $set: { isBlocked: false } },
        { new: true }
    );

    if (result) {
        // create notification and send it to admin
        NotificationService.createNotificationIntoDB({
            title: 'User Unblocked',
            message: `You unblocked ${result?.name} successfully.`,
            reciver: 'admin',
        });

        sendAdminNotification(io, {
            title: "User Unblocked",
            message: `You unblocked ${result?.name} successfully.`,
        })
    }

    return result;
}

export const UserService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUserForDB,
    blockUserFormDB,
    unblockUserFormDB
};