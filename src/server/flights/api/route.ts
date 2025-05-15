import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FlightsSearchPayload, FlightsSearchResponse } from '../struct';
import { flightsSearchService } from '../service/flightservice';
import { HTTP_RESPONSE_CODES } from '../../../appconstants/httpresponsecodes';

export async function flightRoutes(fastify: FastifyInstance) {
    // Flights search
    fastify.post('/search', async (request: FastifyRequest<{ Body: FlightsSearchPayload }>, reply: FastifyReply) => {
        try {
            // Payload
            const payload: FlightsSearchPayload = request.body;
    
            // Service call
            const response: FlightsSearchResponse = await flightsSearchService(payload);
    
            // Response
            return reply.send(response);
        } catch (err: any) {
            reply.status(err.code || HTTP_RESPONSE_CODES.BAD_REQUEST).send({ message: err.message || "Error occurred while getting data" });
        }
    });
}