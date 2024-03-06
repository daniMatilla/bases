import {
    appendFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
} from 'fs';
import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogDatasource } from './iLog.datasource';

export class FileSystemDatasource implements ILogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(log)}\n`;

        appendFileSync(this.allLogsFile, logAsJSON);

        switch (log.level) {
            case LogLevel.medium:
                appendFileSync(this.mediumLogsFile, logAsJSON);
                break;
            case LogLevel.high:
                appendFileSync(this.highLogsFile, logAsJSON);
                break;
        }
    }

    async getLogs(level: LogLevel): Promise<LogEntity[]> {
        switch (level) {
            case LogLevel.low:
                return this.readLogFromFile(this.allLogsFile);
            case LogLevel.medium:
                return this.readLogFromFile(this.mediumLogsFile);
            case LogLevel.high:
                return this.readLogFromFile(this.highLogsFile);
            default:
                throw new Error(`${level} not implemented`);
        }
    }

    private readonly logPath = 'logs/';
    private readonly allLogsFile = `${this.logPath}all-logs.log`;
    private readonly mediumLogsFile = `${this.logPath}medium-logs.log`;
    private readonly highLogsFile = `${this.logPath}high-logs.log`;
    private readonly logsFiles = [
        this.allLogsFile,
        this.mediumLogsFile,
        this.highLogsFile,
    ];

    constructor() {
        this.createLogsFiles();
    }

    private readLogFromFile = (logFile: string): LogEntity[] =>
        readFileSync(logFile, 'utf-8').split('\n').map(LogEntity.fromJson);

    private createLogsFiles = () => {
        if (!existsSync(this.logPath)) mkdirSync(this.logPath);
        this.logsFiles.forEach((file) => {
            if (!existsSync(file)) writeFileSync(file, '');
        });
    };
}
