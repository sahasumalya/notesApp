const schema = require("../config/schema.json");
const post_notes = require("../handlers/post_data.handler");
const get_notes = require("../handlers/get_data.handler");
const update_notes = require("../handlers/update_data.handler");
const delete_notes = require("../handlers/delete_data.handler");
const login = require("../handlers/login.handler");
const register = require("../handlers/register.handler");
const logout = require("../handlers/logout.handler");

async function routes(fastify) {
    //Integration Endpoints
    fastify.post(schema.post_notes.schema.url, schema.post_notes.schema, post_notes);
    fastify.post(schema.get_notes.schema.url, schema.get_notes.schema, get_notes);
    fastify.post(schema.update_notes.schema.url, schema.update_notes.schema, update_notes);
    fastify.post(schema.delete_notes.schema.url, schema.delete_notes.schema, delete_notes);
    fastify.post(schema.login.schema.url, schema.login.schema, login);
    fastify.post(schema.register.schema.url, schema.register.schema, register);
    fastify.post(schema.logout.schema.url, schema.logout.schema, logout);
    
}

module.exports = routes;