import {apiResponse, apiError} from "../utils/helpers"
import {log} from '../utils/helpers'
import {AppConfig} from '../utils/config'
import mongoose from "mongoose"
// import bcrypt from "@types/bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.mjs"


const jwtSecret = "SNR_DEMO";

export const createLogin = async (record) => {
    log.debug("user login");
    const {username, password} = JSON.parse(record["body"]);

    log.debug(`recordObj: ${password}`);

    try {

         // connect to mongodb
         let mongoDBUrl = AppConfig.MONGO_DB_URL;
         log.debug(mongoDBUrl);
         await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        const user = await User.findOne({username});
         
        if(!user) {
            return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };
        }

        // Compare entered password with the hashed password in the database
        // const isMatch = await bcrypt.compare(password, user.password);

        // if (!isMatch) {
        //     return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };
        // }

        const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

        return { statusCode: 200, body: JSON.stringify({ token }) };

    } catch(e) {
        log.debug(`error while getting the data: ${e}`);
        return { statusCode: 500, body: JSON.stringify({ message: 'Internal server error' }) };
    }
}
