import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogRepository } from '../../domain/repository/iLog.repository';
import { ILogDatasource } from '../datasource/iLog.datasource';

export class LogRepository implements ILogRepository {
    constructor(private readonly logDatasourece: ILogDatasource) {}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasourece.saveLog(log);
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        return this.logDatasourece.getLogs(level);
    }
}
