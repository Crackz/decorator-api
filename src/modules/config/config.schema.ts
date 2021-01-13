export default {
    title: 'Config Schema',
    type: 'object',
    properties: {
        HOST: {
            type: 'string',
        },
        PORT: {
            type: 'number',
        },
        DB_CONNECTION_STRING: {
            type: 'string'
        },
        defaultLanguage: {
            type: 'string'
        },
        jwtSecret: {
            type: 'string'
        },
    },
    additionalProperties: false,
    minProperties: 5
};