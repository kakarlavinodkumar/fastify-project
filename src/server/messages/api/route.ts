import { FastifyInstance } from 'fastify';
import { UpdateMessagePayload, UpdateMessageResponse } from '../struct';
import { updateMessageService } from '../service/messageservice';
import { HTTP_RESPONSE_CODES } from '../../../appconstants/httpresponsecodes';

export async function messageRoutes(fastify: FastifyInstance) {
    // Create a new message
    fastify.post('/', async (request, reply) => {
        return reply.status(201).send({ message: "success"});
    });

    // Get all messages
    fastify.get('/', async (request, reply) => {
        return reply.send([]);
    });

    // Get a single message by ID
    fastify.get('/:id', async (request, reply) => {
        return reply.send({message: "success"});
    });

    // Update a message by ID
    fastify.put<{ Body: UpdateMessagePayload }>('/', async (request, reply) => {
        try {
            // Payload
            const payload = request.body;
    
            // Service call
            const response: UpdateMessageResponse = await updateMessageService(fastify, payload);
    
            // Response
            reply.status(HTTP_RESPONSE_CODES.SUCCESS).send(response);
        } catch (err: any) {
            reply.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).send({ message: err.message ||  "Bad request" });
        }
    });

    // Delete a message by ID
    fastify.delete('/:id', async (request, reply) => {
        return reply.send({message: "success"});
    });
}