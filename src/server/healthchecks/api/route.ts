import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function healthCheckRoutes(fastify: FastifyInstance) {
    fastify.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ status: 'ok', timestamp: new Date().toISOString() });
    });

    fastify.get('/liveness', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.send({ status: 'alive' });
    });
}