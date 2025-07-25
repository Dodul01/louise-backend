export interface TUser {
    name: string;
    email: string;
    password: string | undefined;
    isVerified?: boolean;
    isAgreeWithTermsAndConditions?: boolean;
    giftSent: number;
    giftReceived : number;
    isBlocked: boolean;
    role: "vendor" | "admin"
}