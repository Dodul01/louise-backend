import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    Jwt_Token: process.env.JWT_TOKEN as string,
    jwt_access_expiry: process.env.JWT_ACCESS_EXPIRES_IN as string,
    NODE_ENV: process.env.NODE_ENV,
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
    },
};
