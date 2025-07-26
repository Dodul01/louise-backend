export interface TUser {
    serialId: string;
    name: string;
    email: string;
    password: string | undefined;
    isVerified?: boolean;
    isAgreeWithTermsAndConditions?: boolean;
    giftSent: number;
    giftReceived: number;
    isBlocked: boolean;
    isDeleted: boolean;
    role: "vendor" | "admin"
}