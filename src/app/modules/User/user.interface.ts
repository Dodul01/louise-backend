export interface TUser {
    serialId: string;
    name: string;
    profile_image?: string | null;
    email: string;
    phone: string;
    password: string | undefined;
    isVerified?: boolean;
    isAgreeWithTermsAndConditions?: boolean;
    giftSent: number;
    giftReceived: number;
    isBlocked: boolean;
    isDeleted: boolean;
    role: "user" | "vendor" | "admin"
}