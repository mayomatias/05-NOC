import { log } from 'console';
import { Server } from './presentation/server';
import { envs } from './config/envs.plugin';
import { MongoDatabase } from './data/mongo/init';
import { LogModel } from './data/mongo/models/log.model';

(async() =>  {

    main()

})();

async function main(){
    MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })
    // Crear coleccion = tablas, documento = registro
/*     const newLog = await LogModel.create({
        message: 'Test message',
        origin: 'App.ts',
        level: 'low'

    })

    await newLog.save() */

/*     const logs = await LogModel.find()

    console.log(logs); */
    



   Server.start();
   //console.log(envs);
   
}