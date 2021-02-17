const fastify = require("fastify")({
    logger: true,
});

const path = require("path");
const cors = require("cors");
const dbConnector = require("./connector/db.connector.js");
const swagger = require("./config/swagger");
const appConfig = require("./config/app.config.json");
const packageJSON = require("./package.json");
const routesRegister = require("./config/routers-register.json");
fastify.register(require('fastify-express'))

fastify.register(require("fastify-swagger"), swagger.options);

fastify.register(require('fastify-cookie'), {
  secret: "sfbfsbsfbffffffffb", // for cookies signature
  parseOptions: {}     // options for parsing cookies
})

//fastify.use(cors());

fastify.get("/info", (req, res) => {
    res.send({
        name: packageJSON.name,
        version: packageJSON.version,
        description: packageJSON.description,
    });
});


routesRegister.forEach((route) => fastify.register(require(path.resolve(__dirname, route))));

global.rootDir = __dirname;



fastify.setNotFoundHandler((request, reply) => {
    reply.code(404).type("application/json").send({
        statusCode: 404,
        status: 404,
        message: "Not Found",
    });
});
let env = process.env.NODE_ENV || "local";
(async () => {
    fastify.listen(appConfig.port, appConfig.host, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
        fastify.swagger();
        fastify.log.info(`Environment is:' ${env}`);
        fastify.log.info(`server listening on ${address}`);
        fastify.log.info(`Browse your REST API at %s%s ${address}/explorer`);
    });
})();
