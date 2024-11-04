import { error } from 'console';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
    
    public static start() {
        console.log('server starter');
        
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                
                //new CheckService().execute('https://google.com');
                const url = 'http://localhost:3000';
                new CheckService(
                    () => console.log(`Url ${url} is OK`),
                    (error) => console.log(error)                    
                ).execute(url);
                
            }
        );
    

    }
}