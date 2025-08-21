import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const userValidationSchema = z.object({
    name: z
        .string({
            required_error: "Name is required.",
            invalid_type_error: "Name must be a string.",
        })
        .min(2, { message: "Name must be at least 2 characters." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .string({
            required_error: "Email is required.",
            invalid_type_error: "Email must be a string.",
        })
        .email({ message: "Invalid email address." }),

    phone: z
        .string({
            required_error: "Phone number is required.",
            invalid_type_error: "Phone number must be a string.",
        })
        .transform((val) => val.replace(/\s+/g, ""))
        .transform((val) => {
            const phone = parsePhoneNumberFromString(val);
            return phone ? phone.number : val;
        })
        .refine((val) => {
            const phone = parsePhoneNumberFromString(val);
            return phone?.isValid() ?? false;
        }, { message: "Invalid phone number." }),

    password: z
        .string({
            required_error: "Password is required.",
            invalid_type_error: "Password must be a string.",
        })
        .min(6, { message: "Password must be at least 6 characters." })
        .max(20, { message: "Password cannot exceed 20 characters." }),
});

export const userValidation = { userValidationSchema };