import z from "zod";

const verifyEmailSchema = z.object({
    userId: z.string({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }),
});

export const verifyEmailValidation = {
    verifyEmailSchema,
};