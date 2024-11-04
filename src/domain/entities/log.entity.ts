/*  Esta entidad nos va a permitir crear instancias de nuestro LogEntity 
Lo que va a gobernar nuestra aplicacion. */

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

}