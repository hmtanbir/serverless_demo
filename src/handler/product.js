import {apiResponse, apiError} from "../utils/helpers"
import {log} from '../utils/helpers'
import {AppConfig} from '../utils/config'
import Product from '../models/product.mjs'
import mongoose from "mongoose";

// getAllProducts
// curl --location --request GET 'http://localhost:3000/dev/api/v1/products'
export const getAllProducts = async () => {
    log.debug("getAllProducts");
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        // get the record
        let queryData = await Product.find();
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "Data found.", data: queryData});
    } catch (e) {
        log.debug(`error while getting the data: ${e}`);
        return apiError(404, {status: "failed", statusCode: 404, message: "data not found", data: []});
    }
}

// getAllProducts
// curl --location --request GET 'http://localhost:3000/dev/api/v1/products/121313091029'
export const getProduct= async (record) => {
    log.debug("getProduct");
    try {

        // connect to mongodb
        let mongoDBUrl = AppConfig.MONGO_DB_URL;
        await mongoose.connect(mongoDBUrl);

        // check if the database is connected
        const isConnected = mongoose.connection.readyState;
        if (isConnected !== 1) return apiError(400, {status: "failed", statusCode: 400, message: "database is not connected", data: []});
        log.debug("connected to mongodb");

        // get the productId
        const dataId = record.pathParameters.id;
    
        // get the record
        let queryData = await Product.findById(dataId);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "Data found.", data: queryData});
    } catch (e) {
        log.debug(`error while getting the data: ${e}`);
        return apiError(404, {status: "failed", statusCode: 404, message: "data not found", data: []});
    }
}

//createProduct
// curl --location --request POST 'http://localhost:3000/dev/api/v1/products' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "body": {
//         "name": "Soap",
//         "description": "Lifebiy",
//         "price": 10",
//         "quantity": 100
//         }
//     }'
export const createProduct = async (record) => {
    log.debug("createProduct");
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
        let queryData = await Product.create(recordObj);

        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", msg: "Data is not saved"});

        return apiResponse({status: "success", statusCode: 200, message: "Data added successfully.", data: queryData});
    } catch (e) {
        log.debug(`error while saving the data: ${e}`);
        return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});
    }
}

// updateProduct
// curl --location --request PUT 'http://localhost:3000/dev/api/v1/products/658ed19939d8030c89959bd7' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "body": {
//         "name": "Soap",
//         "description": "Lifebiy",
//         "price": 10",
//         "quantity": 100
//         }
//     }'
export const updateProduct = async (record) => {
    log.debug("updateProduct");
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
        // update the record
        let queryData = await Product.findByIdAndUpdate(dataId, recordObj, {new: true});
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

// deleteProduct
// curl --location --request DELETE 'http://localhost:3000/dev/api/v1/products/658ed19939d8030c89959bd7' \
// --header 'Content-Type: application/json' \
export const deleteProduct = async (record) => {
    log.debug("deleteProduct");
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
        let queryData = await Product.findByIdAndDelete(dataId);
        log.debug(`query result :: queryData: ${JSON.stringify(queryData)}`);

        // check if the record is saved
        if (!queryData) return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});

        return apiResponse({status: "success", statusCode: 200, message: "data deleted successfully.", data: queryData});
    } catch (e) {
        log.debug(`error while deleting the data: ${e}`);
        return apiError(400, {status: "failed", statusCode: 400, message: "bad request", data: []});
    }
}
