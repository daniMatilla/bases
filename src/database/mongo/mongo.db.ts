import { LogEntity, LogLevel } from '../../domain/entity/log.entity';
import { ILogRepository } from '../../domain/repository/iLog.repository';
import mongoose from 'mongoose';

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDataBase {
    static readonly TAG: string = this.name;

    constructor(private readonly logRepository: ILogRepository) {}

    async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, { dbName });
            const messsage = `Mongo connected. DB::${dbName}`;

            this.logRepository.saveLog(
                new LogEntity({
                    origin: MongoDataBase.TAG,
                    message: messsage,
                    level: LogLevel.high,
                })
            );

            console.log(messsage);
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity({
                    origin: MongoDataBase.TAG,
                    message: `${error}`,
                    level: LogLevel.high,
                })
            );
            throw error;
        }
    }
}
