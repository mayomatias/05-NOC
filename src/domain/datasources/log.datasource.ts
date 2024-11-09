/**     Reglas de negocios para nuestros datasources
 *      Es como establecer un contrato donde todos mis 
 *  datasources tienen que cumplirlo, sino, no van a ser 
 *  un origen de datos propios para nuestro LogDatasource
 */


/* Nuestro logDatasource establece las regla para que cualquier objeto que nosotros creemos 
Pueda ser un logDatasource, como pueden ser fileSystemLogDatasource o mongoLogDatasource
*/ 

import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDatasource {
    abstract saveLog(log: LogEntity) : Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ) : Promise<LogEntity[]>

}