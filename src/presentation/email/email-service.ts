import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogEntityOptions, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendEmailOptions {
    to: string,
    subject: string;
    htmlBody: string;
    attachements?: Attachment[]

}

interface Attachment {
    filename: string;
    path: string;
}
 

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }   
    })
    constructor(
        private readonly logRepository: LogRepository
    ){}
    
    async sendEmail(options: SendEmailOptions):Promise<boolean> {
        
        const { to, subject, htmlBody, attachements = []} = options; 
        
        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })

            //console.log(sentInformation);

            const log = new LogEntity({
                origin: 'email-service.ts',
                level: LogSeverityLevel.low,
                message: 'Correo enviado',
            })

            this.logRepository.saveLog(log)
            return true
            
            
        } catch (error) {

            const log = new LogEntity({
                origin: 'email-service.ts',
                level: LogSeverityLevel.high,
                message: 'Email not sent',
            })

            this.logRepository.saveLog(log)
            
            return false;
        }
    }


    async sendEmailWithFileSystemLogs(to: string){
        
        const subject = 'Logs de sendEmailWithFileSystemLogs'
        const htmlBody = `
                <h3>Logs de sistema: sendEmailWithFileSystemLogs</h3>
                <p>Esto es una alerta: sendEmailWithFileSystemLogs</p>
            `
        const attachements:Attachment[] = [
            {filename: 'logs-all.log', path:'./logs/logs-all.log'}
        ]

        return this.sendEmail({
            to, subject, htmlBody, attachements,
        })
    }
    
    

}