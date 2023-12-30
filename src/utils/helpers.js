'use strict'
import mongoose from 'mongoose'
import pino from 'pino'
import {AppConfig} from './config'
import jwt from "jsonwebtoken"

let connection = null

export const connectMongoDB = async () => {
    try {
        if (connection == null) {
            log.debug(` MongoDB Url---> ${JSON.stringify(AppConfig.MONGO_DB_URL)}`)
            connection = await mongoose.connect(AppConfig.MONGO_DB_URL)
            console.log(`Connection Response---> ${connection}`)
            return connection
        }
        console.log('Connection already established, reusing the connection')
    } catch (error) {
        console.log('connection Error', error)
    }
}

export function apiResponse(response) {
    log.debug(`response from apiResponse ==> ${JSON.stringify(response)}`)
    const httpResponse = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,HEAD,OPTIONS',
        },
        body: Object.keys(response).length > 0 ? JSON.stringify(response) : '{"status":"NO_RECORDS_FOUND"}',
    }
    log.debug('apiResponse: ' + JSON.stringify(httpResponse))
    return httpResponse
}

export function apiError(statusCode, errorDesc) {
    log.debug('errorDesc: ' + JSON.stringify(errorDesc))
    const response = {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(errorDesc),
    }
    log.debug('api error Response: ' + JSON.stringify(response))
    return response
}

export function errorVal(statusCode, errorDesc) {
    const response = {
        statusCode: statusCode,
        body: JSON.stringify(errorDesc),
    }
    log.debug('api error Response: ' + JSON.stringify(response))
    return response
}

export const log = pino({
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: process.env.NODE_ENV !== 'production' || process.env.LOG_PRETTY_PRINT === 'true',
})

export const checkAuth = (record) => {
    try {
        // Extract the authorization header
        const authorizationHeader = record.headers["Authorization"];
        const jwtSecret = "SNR_DEMO";

        if (!authorizationHeader) {
            return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized, token is required' }) };
        }

        // Extract and decode the token
        const token = authorizationHeader.split(' ')[1];
        log.debug(`"token:" ${token}`);
        jwt.verify(token, jwtSecret);
        log.debug("token matched");

        // Continue processing
        return null;
    } catch (e) {
        log.debug('Error during authentication:', `${e}`);
        return { statusCode: 401, body: JSON.stringify({ message: 'unauthorized' }) };
    }
};
