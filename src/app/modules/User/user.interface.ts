export interface TUser {
    name: string;
    email: string;
    password: string | undefined;
    isVerified?: boolean;
    isAgreeWithTermsAndConditions?: boolean;
}