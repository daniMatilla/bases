import { LogLevel as PostgresLogLevel, PrismaClient } from '@prisma/client';
import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogDatasource } from './iLog.datasource';

export class PostgresDatasource implements ILogDatasource {
    private prisma = new PrismaClient();
    private postgresLogLevelEnum = {
        low: PostgresLogLevel.LOW,
        medium: PostgresLogLevel.MEDIUM,
        high: PostgresLogLevel.HIGH,
    };

    async saveLog(log: LogEntity): Promise<void> {
        await this.prisma.logModel.create({
            data: {
                ...log,
                level: this.postgresLogLevelEnum[log.level],
            },
        });
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        const logs = await this.prisma.logModel.findMany({ where: { level: this.postgresLogLevelEnum[level] } });
        return logs.map(LogEntity.fromObject);
    }
}
