import { envs } from '../plugins/envs.service';
import { FileSystemDatasource } from '../data/datasource/file-system.datasource';
import { LogRepository } from '../data/repository/log.repository';
import { CheckService } from '../domain/usecase/checks/check-service.usecase';
import { CronService } from '../plugins/cron.service';

export class Server {
    static start() {
        console.log('Server started...');

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
