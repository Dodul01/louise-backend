import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

export enum UserRole {
    ADMIN = 'admin',
    VENDOR = 'vendor',
    USER = 'user'
}

const userSchema = new Schema<TUser>({
    serialId: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    profile_image: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    giftSent: {
        type: Number,
        default: 0,
    },
    giftReceived: {
        type: Number,
        default: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isAgreeWithTermsAndConditions: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
    }
},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    const hashedPassword = await bcrypt.hash(
        this.password as string,
        Number(config.bcrypt_salt_rounds),
    );
    this.password = hashedPassword;
    next();
})

userSchema.post('save', function (doc, next) {
    doc.password = undefined;
    next();
})


export const User = model<TUser>("User", userSchema);