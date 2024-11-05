import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void )| undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository : LogRepository,  //Inyectar repository en caso de uso
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {

    }

    async execute(url: string):Promise<boolean> {
        
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`)
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
            this.logRepository.saveLog(log)
            
            this.successCallback && this.successCallback();
            //console.log(`${url} is OK`);
            return true;

        } catch (error) {
            //console.log(`${error}`);

            const errorMessage = `${error}`
            const log = new LogEntity(errorMessage, LogSeverityLevel.high)
            this.logRepository.saveLog(log)

            this.errorCallback && this.errorCallback(`${error}`) //si existe
            return false
        }

        
    }
}