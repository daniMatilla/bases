import { envs } from '../plugins/envs.service';
import { FileSystemDatasource } from '../data/datasource/file-system.datasource';
import { LogRepository } from '../data/repository/log.repository';
import { CheckService } from '../domain/usecase/checks/check-service.usecase';
import { CronService } from '../plugins/cron.service';
import { MailerService } from '../plugins/mailer.service';
import { SendLogsEmail } from '../domain/usecase/mailer/send-logs-email.usecase';
import { MongoDataBase } from '../database/mongo/mongo.db';
import { LogModel } from '../database/mongo/models/log.model';

export class Server {
    static start() {
        console.log('Server started...');
        new MongoDataBase(fileSystemRepository).connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });

        createMongoLog();

        // cronService();
        // sendLogsEmail();
    }
}

const url = `http://localhost:${envs.PORT}`;
const fileSystemRepository = new LogRepository(new FileSystemDatasource());
const mailerService = new MailerService();

const createMongoLog = async () => {
    const dbLog = await LogModel.create({
        message: 'Test message',
        origin: 'app.ts',
        level: 'low',
    });

    await dbLog.save();
};

const sendLogsEmail = () =>
    new SendLogsEmail(fileSystemRepository, mailerService).call(
        'danimatilla@outlook.es'
    );

const cronService = () =>
    CronService.createJob('*/5 * * * * *', () => {
        new CheckService(
            fileSystemRepository,
            () => console.log(`${url} is ok`),
            (error) => console.log(error)
        ).call(url);
    });
