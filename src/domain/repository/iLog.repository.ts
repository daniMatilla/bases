import { LogEntity, LogLevel } from '../entity/log.entity';

export interface ILogRepository {
    saveLog(log: LogEntity): Promise<void>;
    getLogs(level: LogLevel): Promise<LogEntity[]>;
}
