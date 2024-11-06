import nodemailer from 'nodemailer';
import { envs } from '../../config/envs.plugin';


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
            return true
            
        } catch (error) {
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