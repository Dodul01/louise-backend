import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com.',
        port: 587,
        secure: config.NODE_ENV === "production",
        auth: {
            user: 'allendodul6@gmail.com',
            pass: 'gkbq saom tmxp loll',
        }
    });

    await transporter.sendMail({
        from: 'allendodul6@gmail.com',
        to,
        subject,
        html,
    })
}