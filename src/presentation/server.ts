import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class Server {
    
    public static start() {
        console.log('server starter');
        
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
                //new CheckService().execute('https://google.com');
                const url = 'http://localhost:3000';
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`Url ${url} is OK`),
                    (error) => console.log(error)                    
                ).execute(url);
                
            }
        );
    

    }
}