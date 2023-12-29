import {apiResponse, apiError} from "../utils/helpers"
import {log} from '../utils/helpers'
import {AppConfig} from '../utils/config'
import User from '../models/user.mjs'
import mongoose from "mongoose";

// getAllUsers
// curl --location --request GET 'http://localhost:3000/dev/api/users'
export const getAllUsers = async () => {
    log.debug("getAllUser");
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        // get the record
        let queryData = await User.find();
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "Data found.", data: queryData});
    } catch (e) {
        log.debug(`error while getting the data: ${e}`);
        return apiError(404, {status: "failed", statusCode: 404, message: "data not found", data: []});
    }
}

// getAllUsers
// curl --location --request GET 'http://localhost:3000/dev/api/users/121313091029'
export const getUser = async (record) => {
    log.debug("getUser");
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        // get the userId
        const dataId = record.pathParameters.id;
    
        // get the record
        let queryData = await User.findById(dataId);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "Data found.", data: queryData});
    } catch (e) {
        log.debug(`error while getting the data: ${e}`);
        return apiError(404, {status: "failed", statusCode: 404, message: "data not found", data: []});
    }
}

//createUser
// curl --location --request POST 'http://localhost:3000/dev/api/users' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "body": {
//         "username": "alex",
//         "name": "Alex Bell",
//         "email": "alex@bell.com",
//         "password": "123456",
//         }
//     }'
export const createUser = async (record) => {
    log.debug("createUser");
    let recordObj = JSON.parse(record["body"]);
    log.debug(`recordObj: ${JSON.stringify(recordObj)}`);
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        log.debug(mongoDBUrl);
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        // save the record
        let queryData = await User.create(recordObj);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", msg: "Data is not saved"});

        return apiResponse({status: "success", statusCode: 200, message: "Data added successfully.", data: queryData});
    } catch (e) {
        log.debug(`error while saving the data: ${e}`);
        return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});
    }
}

// updateUser
// curl --location --request PUT 'http://localhost:3000/dev/api/users/658ed19939d8030c89959bd7' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "body": {
//         "username": "alex2",
//         "name": "Alex Bell",
//         "email": "alex@bell.com",
//         "password": "123456"
//         }
//     }'
export const updateUser = async (record) => {
    log.debug("updateUser");
    let recordObj = JSON.parse(record["body"]);
    log.debug(`recordObj: ${JSON.stringify(recordObj)}`);
    
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");
        
        const dataId = record.pathParameters.id;
        log.debug(`user id: ${dataId}`);
        // update the record
        let queryData = await User.findByIdAndUpdate(dataId, recordObj, {new: true});
        log.debug(`query result :: queryData: ${recordObj.name}`);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "Data updated successfully.", data: queryData});
    } catch (e) {
        log.debug(`error while updating the data: ${e}`);
        return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});
    }
}

// deleteUser
// curl --location --request DELETE 'http://localhost:3000/dev/api/users/658ed19939d8030c89959bd7' \
// --header 'Content-Type: application/json' \
export const deleteUser = async (record) => {
    log.debug("deleteUser");
    let recordObj = JSON.parse(record["body"]);
    log.debug(`recordObj: ${JSON.stringify(recordObj)}`);
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        const dataId = record.pathParameters.id;
        log.debug(`data id: ${dataId}`);

        // delete the record
        let queryData = await User.findByIdAndDelete(dataId);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "data deleted successfully.", data: queryData});
    } catch (e) {
        log.debug(`error while deleting the data: ${e}`);
        return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});
    }
}
