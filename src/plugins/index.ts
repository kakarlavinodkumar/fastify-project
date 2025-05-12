import { FastifyInstance } from 'fastify';
import { setupDB } from '../database/connect';
import { setupRoutes } from '../server/route';

// Register plugins here
export async function registerPlugins(fastify: FastifyInstance) {
    // Register database connection
    await fastify.register(setupDB);

    // Register routes
    await fastify.register(setupRoutes, { prefix: '/api/v1/mercury' });    
}