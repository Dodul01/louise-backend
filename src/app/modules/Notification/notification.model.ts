import mongoose, { Schema } from "mongoose";
import { INotification } from "./notification.interface";

const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    reciver: {
        type: String,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
);

notificationSchema.index({ reciver: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);