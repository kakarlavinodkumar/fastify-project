import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyORMPlugin from 'typeorm-fastify-plugin';

import { Message } from './entities/message';

async function dbConnector(fastify: FastifyInstance) {
    try {
        fastify.register(fastifyORMPlugin, {
            host: 'localhost',
            port: 5432,
            type: 'postgres',
            database: 'postgres',
            username: 'postgres',
            password: 'postgres',
            synchronize: true, // Automatically sync schema (use cautiously in production)
            logging: true,
            entities: [Message], // Register the entities here
        }).ready();
      
        await fastify.after();
    } catch (err) {
        fastify.log.error(err);
        throw err;
    }
}

export const setupDB = fastifyPlugin(dbConnector);