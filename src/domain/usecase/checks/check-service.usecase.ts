import { LogEntity, LogLevel } from '../../entity/log.entity';
import { ILogRepository } from '../../repository/iLog.repository';

interface CheckServiceUseCase {
    call(url: string): Promise<void>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly logRepository: ILogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    async call(url: string): Promise<void> {
        try {
            const rep = await fetch(url);
            if (!rep.ok) throw new Error(`Check service ${url}`);

            this.logRepository.saveLog(new LogEntity(`Service ${url} working`, LogLevel.low));
            this.successCallback();
        } catch (error) {
            this.logRepository.saveLog(new LogEntity(`${url} is not ok. ${error}`, LogLevel.high));
            this.errorCallback(`${error}`);
        }
    }
}
