import { z } from 'zod';

export const userValidationSchema = z.object({
    name: z.string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string.',
    }),

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

export const userValidation = {
    userValidationSchema,
};
