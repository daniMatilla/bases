import { envs } from '../plugins/envs.service';
import { FileSystemDatasource } from '../data/datasource/file-system.datasource';
import { LogRepository } from '../data/repository/log.repository';
import { CheckService } from '../domain/usecase/checks/check-service.usecase';
import { CronService } from '../plugins/cron.service';
import { MailerService } from '../plugins/mailer.service';
import { SendLogsEmail } from '../domain/usecase/mailer/send-logs-email.usecase';

export class Server {
    static start() {
        console.log('Server started...');
        // cronService();
        // sendLogsEmail();
    }
}

const url = `http://localhost:${envs.PORT}`;
const fileSystemRepository = new LogRepository(new FileSystemDatasource());
const mailerService = new MailerService();

const sendLogsEmail = () =>
    new SendLogsEmail(fileSystemRepository, mailerService).call('danimatilla@outlook.es');

const cronService = () =>
    CronService.createJob('*/5 * * * * *', () => {
        new CheckService(
            fileSystemRepository,
            () => console.log(`${url} is ok`),
            (error) => console.log(error)
        ).call(url);
    });
