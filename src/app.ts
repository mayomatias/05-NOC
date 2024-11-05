import { log } from 'console';
import { Server } from './presentation/server';
import { envs } from './config/envs.plugin';

(async() =>  {

    main()

})();

function main(){
   // Server.start();
   console.log(envs);
   
}