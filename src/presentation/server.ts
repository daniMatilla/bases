import { envs } from '../plugins/envs.service';
import { FileSystemDatasource } from '../data/datasource/file-system.datasource';
import { LogRepository } from '../data/repository/log.repository';
import { CheckService } from '../domain/usecase/checks/check-service.usecase';
import { CronService } from '../plugins/cron.service';
import { MailerService } from '../plugins/mailer.service';
import { SendLogsEmail } from '../domain/usecase/mailer/send-logs-email.usecase';
import { MongoDataBase } from '../database/mongo/mongo.db';
import { LogModel } from '../database/mongo/models/schema.mongo';
import { MongoDatasource } from '../data/datasource/mongo.datasource';
import { PrismaClient } from '@prisma/client';
import { PostgresDatasource } from '../data/datasource/postgres.datasource';

export class Server {
    static start() {
        console.log('Server started...');
        // mongoConnect();

        cronService();
        // sendLogsEmail();
    }
}

const url = `http://localhost:${envs.PORT}`;
const logRepository = new LogRepository(
    // new FileSystemDatasource()
    // new MongoDatasource()
    new PostgresDatasource()
);
const mailerService = new MailerService();

const mongoConnect = () => {
    new MongoDataBase(logRepository).connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
};

const sendLogsEmail = () => new SendLogsEmail(logRepository, mailerService).call('danimatilla@outlook.es');

const cronService = () =>
    CronService.createJob('*/5 * * * * *', () => {
        new CheckService(
            logRepository,
            () => console.log(`${url} is ok`),
            (error) => console.log(error)
        ).call(url);
    });
