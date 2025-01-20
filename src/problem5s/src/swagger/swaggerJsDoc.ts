import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Resource API',
            version: '1.0.0',
            description: 'API for managing resources',
        },
        servers: [
            {
                url: process.env.BASE_URL,
            },
        ],
    },
    apis: ['./src/**/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export {
    swaggerDocs
}