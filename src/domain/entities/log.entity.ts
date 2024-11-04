/*  Esta entidad nos va a permitir crear instancias de nuestro LogEntity  */

export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}



export class LogEntity {

    public level: LogSeverityLevel;
    public messagge: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ){
        this.messagge = message;
        this.level = level;
        this.createdAt = new Date()
    }

    static logFromJson = (json: string):LogEntity => {
        const {message, level, createdAt} = JSON.parse(json);

        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt)
        
        return log;

    }

}