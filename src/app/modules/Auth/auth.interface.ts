export type TLoginUser = {
    email: string;
    password: string;
}

export type TForgetPassword = {
    email: string;
}

export type TResetPassword = {
    // jwtToken: string;
    newPassword: string;
}