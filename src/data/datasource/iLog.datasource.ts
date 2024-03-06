import { LogEntity, LogLevel } from "../../domain/entity/log.entity";

export interface ILogDatasource{
    saveLog(log: LogEntity): Promise<void>;
    getLogs(level: LogLevel): Promise<LogEntity[]>;
}