import nodemailer from 'nodemailer';
import { envs } from './envs.service';

interface ISendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: IAttachment[];
}

interface IAttachment {
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

    async sendEmail(options: ISendEmailOptions): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options;

        try {
            await this.transporter.sendMail({
                to,
                subject,
                html,
                attachments,
            });

            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
        const subject = 'Logs de sistema';
        const html = `
            <h3>Logs de sistema</h3>
            <p>
                Eiusmod laborum do fugiat reprehenderit et consequat. Officia ut veniam eiusmod est eiusmod commodo minim aliquip sunt veniam elit nulla non. Ullamco do ut nostrud sint esse irure ex anim veniam sint cillum sint. Lorem elit et irure nostrud eiusmod ad ullamco aute commodo quis. Incididunt ut reprehenderit nostrud esse ipsum pariatur.
                Anim nostrud cupidatat ad proident nisi mollit sit reprehenderit. Consectetur sunt enim duis ea pariatur proident ad fugiat eiusmod qui nisi consectetur laborum consectetur. Nostrud Lorem deserunt culpa consectetur sint elit ex tempor exercitation consequat labore consectetur cillum. Id sit nisi dolor aute commodo Lorem exercitation sit.
                Cillum nisi aliquip magna aliquip eiusmod laborum. Commodo labore nisi exercitation deserunt mollit eu mollit elit excepteur adipisicing. Veniam ut do mollit est dolor aliquip sint amet ad non aliquip nulla enim sunt. Aute nostrud quis deserunt duis ullamco irure tempor ipsum esse. Velit enim mollit duis magna.
            </p>
            <p>Ver logs adjumtos</p>
        `;
        const attachments = [
            { filename: 'all-logs.log', path: 'logs/all-logs.log' },
            { filename: 'medium-logs.log', path: 'logs/medium-logs.log' },
            { filename: 'high-logs.log', path: 'logs/high-logs.log' },
        ];

        return this.sendEmail({
            to,
            subject,
            html,
            attachments,
        });
    }
}
