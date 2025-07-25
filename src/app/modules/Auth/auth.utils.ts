import Jwt from 'jsonwebtoken'

export const createToken = (JwtPayload: {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    isDeleted: boolean;
},
    secret: string,
    expiresIn: string | number,
) => {
    const options = { expiresIn: expiresIn as Jwt.SignOptions['expiresIn'] }
    return Jwt.sign(JwtPayload, secret, options)
}