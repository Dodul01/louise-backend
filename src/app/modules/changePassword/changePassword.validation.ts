import { z } from "zod";

export const changePasswordValidationSchema = z.object({
    email: z.string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
    }),
    password: z.string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string.",
    }),
    newPassword: z.string({
        required_error: "New Password is required.",
        invalid_type_error: "New Password must be a string.",
    }),
    confirmPassword: z.string({
        required_error: "Confirm Password is required.",
        invalid_type_error: "Confirm Password must be a string.",
    }),
});


export const changePasswordValidation = {
    changePasswordValidationSchema
};