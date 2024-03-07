export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

interface LogEntityOptions {
    level: LogLevel;
    message: string;
    createdAt?: Date;
}

export class LogEntity {
    constructor(options: LogEntityOptions) {
        const { level, message, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
    }
    public level: LogLevel;
    public message: string;
    public createdAt: Date;

    static readonly fromJson = (json: string): LogEntity => {
        const { level, message, createdAt } = JSON.parse(json);
        const logEntity = new LogEntity({ message, level, createdAt: new Date(createdAt) });

        return logEntity;
    };
}
