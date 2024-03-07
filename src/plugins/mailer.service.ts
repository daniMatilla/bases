import nodemailer from 'nodemailer';
import { envs } from './envs.service';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class MailerService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html,
                attachments,
            });

            console.log(sendInformation);

            return true;
        } catch (error) {
            return false;
        }
    }
}
