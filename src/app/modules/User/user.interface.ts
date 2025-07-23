export interface TUser {
    name: string;
    email: string;
    password: string | undefined;
    isValidate?: boolean;
    isAgreeWithTermsAndConditions?: boolean;
}