import { INotification } from "./notification.interface";
import { Notification } from "./notification.model";

const createNotificationIntoDB = async (notification: INotification) => {
    const result = await Notification.create(notification);
    return result;
};

export const NotificationService = {
    createNotificationIntoDB,
}