import { MailerService } from '../../../plugins/mailer.service';
import { LogEntity, LogLevel } from '../../entity/log.entity';
import { ILogRepository } from '../../repository/iLog.repository';

interface ISendLogsEmailUseCase {
    call(to: string | string[]): Promise<boolean>;
}

export class SendLogsEmail implements ISendLogsEmailUseCase {
    private static readonly TAG: string = this.name;

    constructor(private readonly logRepository: ILogRepository, private readonly mailerService: MailerService) {}

    async call(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.mailerService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error('Email log not send');

            return true;
        } catch (error) {
            this.logRepository.saveLog(
                new LogEntity({
                    origin: SendLogsEmail.TAG,
                    level: LogLevel.high,
                    message: `Email not sent: ${error}`,
                })
            );
            return false;
        }
    }
}
