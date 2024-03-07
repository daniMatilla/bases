export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

interface LogEntityOptions {
    origin: string;
    message: string;
    level: LogLevel;
    createdAt?: Date;
}

export class LogEntity {
    constructor(options: LogEntityOptions) {
        const { level, message, createdAt = new Date(), origin } = options;
        this.origin = origin;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }
    public level: LogLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    static readonly fromJson = (json: string): LogEntity => {
        const { level, message, createdAt, origin } = JSON.parse(json);
        const logEntity = new LogEntity({ message, level, createdAt: new Date(createdAt), origin });

        return logEntity;
    };
}
