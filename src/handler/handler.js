import { apiResponse } from "../utils/helpers"
import {log} from '../utils/helpers'
import {AppConfig} from '../utils/config'


// call me from terminal like this
// curl --location --request POST 'http://localhost:3000/dev/api/sample/hello'
// (NOTE: to run in offline mode, use NVM to switch to node 14. then run "yarn" to download all dependencies. 
// then run "yarn offline" to start the serverless offline server.)
export const hello = async (record) => {
    log.debug("hello world");
    let env = AppConfig.ENVIRONMENT;
    log.debug(`env: ${env}`);
    return apiResponse({message: 'Hello World'});
}