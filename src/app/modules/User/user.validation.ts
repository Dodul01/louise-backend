import { z } from 'zod';

export const userValidationSchema = z.object({
    name: z.string()
        .nonempty('Name is required.'),

    email: z
        .string()
        .nonempty('Email is required.')
        .email({ message: 'Invalid email.' }),

    password: z
        .string()
        .nonempty('Password is required.')
        .min(6, { message: 'Password must be at least 6 characters.' })
        .max(20, { message: 'Password cannot be more than 20 characters.' }),
});

export const userValidation = {
    userValidationSchema,
};
