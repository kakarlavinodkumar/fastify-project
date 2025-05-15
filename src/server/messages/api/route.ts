import { FastifyInstance } from 'fastify';
import { UpdateMessagePayload, UpdateMessageResponse } from '../struct';
import { updateMessageService } from '../service/messageservice';
import { HTTP_RESPONSE_CODES } from '../../../appconstants/httpresponsecodes';

export async function messageRoutes(fastify: FastifyInstance) {

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

}