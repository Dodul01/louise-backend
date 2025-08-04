import { z } from "zod";

export const giftValidationSchema = z.object({
  sender_name: z.string().min(1),
  recipient_name: z.string().min(1),
  phone_number: z.string().min(5),
  email: z.string().email().optional(),
  personal_message: z.string().optional(),
  venue_name: z.string().min(1),
  gift_type: z.string(), 
  amount: z.number().positive(),
  payment_method: z.enum(["apple_pay", "google_pay", "card"]),
});