export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    constructor(message: string, level: LogLevel) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
    public level: LogLevel;
    public message: string;
    public createdAt: Date;
}
