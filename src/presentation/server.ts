import { envs } from '../plugins/envs.service';
import { FileSystemDatasource } from '../data/datasource/file-system.datasource';
import { LogRepository } from '../data/repository/log.repository';
import { CheckService } from '../domain/usecase/checks/check-service.usecase';
import { CronService } from '../plugins/cron.service';
import { MailerService } from '../plugins/mailer.service';

export class Server {
    static start() {
        console.log('Server started...');

        // new MailerService().sendEmail({
        //     to: 'danimatilla@outlook.es',
        //     subject: 'Logs de sistema',
        //     html: `
        //         <h3>Logs de sistema</h3>
        //         <p>
        //             Eiusmod laborum do fugiat reprehenderit et consequat. Officia ut veniam eiusmod est eiusmod commodo minim aliquip sunt veniam elit nulla non. Ullamco do ut nostrud sint esse irure ex anim veniam sint cillum sint. Lorem elit et irure nostrud eiusmod ad ullamco aute commodo quis. Incididunt ut reprehenderit nostrud esse ipsum pariatur.
        //             Anim nostrud cupidatat ad proident nisi mollit sit reprehenderit. Consectetur sunt enim duis ea pariatur proident ad fugiat eiusmod qui nisi consectetur laborum consectetur. Nostrud Lorem deserunt culpa consectetur sint elit ex tempor exercitation consequat labore consectetur cillum. Id sit nisi dolor aute commodo Lorem exercitation sit.
        //             Cillum nisi aliquip magna aliquip eiusmod laborum. Commodo labore nisi exercitation deserunt mollit eu mollit elit excepteur adipisicing. Veniam ut do mollit est dolor aliquip sint amet ad non aliquip nulla enim sunt. Aute nostrud quis deserunt duis ullamco irure tempor ipsum esse. Velit enim mollit duis magna.
        //         </p>
        //         <p>Ver logs adjumtos</p>
        //     `,
        //     attachments: [
        //         { filename: 'all-logs.log', path: 'logs/all-logs.log' },
        //         { filename: 'medium-logs.log', path: 'logs/medium-logs.log' },
        //         { filename: 'high-logs.log', path: 'logs/high-logs.log' },
        //     ],
        // });

        // CronService.createJob('*/5 * * * * *', () => {
        //     new CheckService(
        //         fileSystemRepository,
        //         () => console.log(`${url} is ok`),
        //         (error) => console.log(error)
        //     ).call(url);
        // });
    }
}

const url = `http://localhost:${envs.PORT}`;
const fileSystemRepository = new LogRepository(new FileSystemDatasource());
