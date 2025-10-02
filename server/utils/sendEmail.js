import nodemailer from "nodemailer";

export const sendEmail = async(to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"Hospital System" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    });
};