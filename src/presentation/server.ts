import { Check } from '../domain/usecases/checks/check.usecase';
import { CronService } from '../plugins/cron.service';

export class Server {
    static start() {
        const url = 'http://localhost:3000'
        CronService.createJob('*/5 * * * * *', () => {
            new Check(
                () => console.log( `${url} is ok` ),
                (error) => console.log(error.message)
            ).call(url);
        });
    }
}
