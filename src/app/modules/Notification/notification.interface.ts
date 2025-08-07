import { Types } from "mongoose";

export interface INotification {
    title?: string;
    message?: string;
    reciver: string;
    sender?: Types.ObjectId;
    isRead?: boolean;
}