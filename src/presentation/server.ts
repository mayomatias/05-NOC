import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-logs';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    //new MongoLogDatasource()
)

export class Server {
    
    public static async start() {
        console.log('server starter');
        const emailService = new EmailService();

       /*  emailService.sendEmail({
            to: 'matiasandresmayo@gmail.com',
            subject: 'Logs de sistema',
            htmlBody:`
                <h3>Logs de sistema</h3>
                <p>Esto es una alerta</p>
            `
         }) */

        //new SendEmailLogs(emailService, fileSystemLogRepository).execute('matiasandresmayo@gmail.com')

        const logs = await logRepository.getLogs(LogSeverityLevel.low)
        console.log(logs);
        


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
                //new CheckService().execute('https://google.com');
                const url = 'http://localhost:3000';
                new CheckService(
                    logRepository,
                    () => console.log(`Url ${url} is OK`),
                    (error) => console.log(error)                    
                ).execute(url);
                
            }
        );
    

    }
}