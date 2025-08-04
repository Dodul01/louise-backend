export interface IGift {
    sender_name: string;
    recipient_name: string;
    phone_number: string;
    email?: string;
    personal_message?: string;
    venue_name: string;
    gift_type: "coffee" | "latte" | "pastry" | "cookies" | "custom";
    amount: number;
    payment_method: "apple_pay" | "google_pay" | "card";
    status: "pending" | "paid" | "redeemed";
    transaction_id: string;
    qr_code: string;
    redeemed_at?: Date;
    created_at: Date;
}

export interface StripeGiftMetadata {
    sender_name: string;
    sender_id: string;
    recipient_name: string;
    recipient_id: string;
    phone_number: string;
    email: string;
    personal_message: string;
    venue_id: string;
    gift_type: string;
}
