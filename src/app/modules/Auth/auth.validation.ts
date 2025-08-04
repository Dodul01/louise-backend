import { z } from "zod";

export const loginValidationSchema = z.object({
    email: z.string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a string.',
    }).email({ message: 'Invalid email.' }),
    password: z.string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a string.',
    }).min(6, { message: 'Password must be at least 6 characters.' })
        .max(20, { message: 'Password cannot be more than 20 characters.' }),
});

export const forgetPasswordValidationSchema = z.object({
    email: z.string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a string.',
    }).email({ message: 'Invalid email.' })
})

export const resetPasswordValidationSchema = z.object({
    jwtToken: z.string({
        required_error: 'JWT token is required.',
        invalid_type_error: 'JWT token must be a string.',
    }),
    newPassword: z.string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a string.',
    }).min(6, { message: 'Password must be at least 6 characters.' })
        .max(20, { message: 'Password cannot be more than 20 characters.' })
})