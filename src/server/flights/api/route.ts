import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface Flight {
    id: string;
    destination: string;
    departureTime: string;
}

const flights: Flight[] = [];

export async function flightRoutes(fastify: FastifyInstance) {
    // Get all flights
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send(flights);
    });

    // Get a single flight by ID
    fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const flight = flights.find(f => f.id === request.params.id);
        if (!flight) {
            reply.status(404).send({ message: 'Flight not found' });
        } else {
            reply.send(flight);
        }
    });

    // Create a new flight
    fastify.post('/', async (request: FastifyRequest<{ Body: Flight }>, reply: FastifyReply) => {
        const newFlight = request.body;
        flights.push(newFlight);
        reply.status(201).send(newFlight);
    });

    // Update a flight by ID
    fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Flight> }>, reply: FastifyReply) => {
        const flightIndex = flights.findIndex(f => f.id === request.params.id);
        if (flightIndex === -1) {
            reply.status(404).send({ message: 'Flight not found' });
        } else {
            flights[flightIndex] = { ...flights[flightIndex], ...request.body };
            reply.send(flights[flightIndex]);
        }
    });

    // Delete a flight by ID
    fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const flightIndex = flights.findIndex(f => f.id === request.params.id);
        if (flightIndex === -1) {
            reply.status(404).send({ message: 'Flight not found' });
        } else {
            const deletedFlight = flights.splice(flightIndex, 1);
            reply.send(deletedFlight[0]);
        }
    });
}