import { LogModel } from '../../database/mongo/models/schema.mongo';
import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogDatasource } from './iLog.datasource';

export class MongoDatasource implements ILogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        await LogModel.create(log);
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        const logs = await LogModel.where({ level: level });
        return logs.map(LogEntity.fromObject);
    }
}
