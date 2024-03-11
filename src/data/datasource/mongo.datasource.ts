import { LogMongooseModel } from '../../database/mongo/models/log.model';
import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogDatasource } from './iLog.datasource';

export class MongoDatasource implements ILogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        await LogMongooseModel.create(log);
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        const logs = await LogMongooseModel.where({ level: level });
        return logs.map(LogEntity.fromObject);
    }
}
