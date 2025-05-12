import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { Client } from 'pg';

// postgres://postgres:postgres@localhost:5432/postgres
async function dbConnector(fastify: FastifyInstance) {
    const client = new Client({
        connectionString: 'postgres://postgres:postgres@localhost:5432/postgres',
    });

    try {
        await client.connect();
        fastify.decorate('pg', client);

        fastify.log.info('Database connected successfully');
        fastify.addHook('onClose', (instance, done) => {
            client.end().then(() => done()).catch(done);
        });
        
    } catch (err) {
        fastify.log.error(err);
        throw err;
    }
}

export const setupDB = fastifyPlugin(dbConnector);