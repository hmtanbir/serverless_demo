export const AppConfig = {
    REGION: process.env.REGION,
    environment: process.env.ENVIRONMENT,
    AWS_SECRET_KEY_ID: process.env.AWS_SECRET_KEY_ID,
    AWS_SECRET_KEY_VAL: process.env.AWS_SECRET_KEY_VAL,
    logLevel: process.env.LOG_LEVEL || 'info',
    APP_NAME: process.env.PROJECT_NM,
    PROJECT_NM: process.env.PROJECT_NM,
    DBT_RULES_ENGINE_DATA: `${process.env.APP_PREFIX}-${process.env.ENVIRONMENT}-${process.env.DBT_RULES_ENGINE_DATA}`,
    MONGO_APPLICATION: process.env.MONGO_DB_NAME,
    APP_PREFIX: process.env.APP_PREFIX,

    MONGO_DB_HOST: process.env.MONGO_DB_HOST,
    MONGO_DB_PORT: process.env.MONGO_DB_PORT,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    MONGO_DB_USER_NAME: process.env.MONGO_DB_USER_NAME,
    MONGO_DB_USER_PASSWORD: process.env.MONGO_DB_USER_PASSWORD,
    MONGO_DB_AUTH_SOURCE: process.env.MONGO_DB_AUTH_SOURCE,
    MONGO_DB_URL: process.env.MONGO_DB_URL,

    ROLE_ARN: process.env.ROLE_ARN,
    RE_TO_SF_JSON_URL: process.env.RE_TO_SF_JSON_URL,
    RE_TO_SF_JSON_API_KEY: process.env.RE_TO_SF_JSON_API_KEY,
    CONVERT_API_CALL_ARN: process.env.CONVERT_API_CALL_ARN,
    GET_API_PARAMETERS_LINK: process.env.GET_API_PARAMETERS_LINK,
    GET_API_PARAMETERS_API_KEY: process.env.GET_API_PARAMETERS_API_KEY,
    CONVERT_DB_API_CALL_ARN: process.env.CONVERT_DB_API_CALL_ARN,

    API_RESPONSE: {
        SUCCESS: 'SUCCESS',
        FAILED: 'FAILED',
    },
    INPUT_TYPE: {
        JSON: 'JSON',
        KEY_VALUE_PAIR: 'KEY_VALUE_PAIR',
    },
    TYPE: ['TEXT', 'EMAIL', 'NUMBER', 'PROTECTED'],
}
