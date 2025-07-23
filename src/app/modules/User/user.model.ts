import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>({
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
    isVerified: {
        type: Boolean,
        default: false
    },
    isAgreeWithTermsAndConditions: {
        type: Boolean,
        default: false
    },
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