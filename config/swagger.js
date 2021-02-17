exports.options = {
    routePrefix: '/explorer',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Notes API',
            description: 'This microservice contains Notes API',
            version: '0.0.1',
        },
        host: 'api.prv:53006',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
};