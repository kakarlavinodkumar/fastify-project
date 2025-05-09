import { FastifyInstance } from 'fastify';

interface Message {
    id: number;
    content: string;
}

let messages: Message[] = [];
let idCounter = 1;

export async function messageRoutes(fastify: FastifyInstance) {
    // Create a new message
    fastify.post('/', async (request, reply) => {
        const { content } = request.body as { content: string };
        if (!content) {
            return reply.status(400).send({ error: 'Content is required' });
        }

        const newMessage: Message = { id: idCounter++, content };
        messages.push(newMessage);
        return reply.status(201).send(newMessage);
    });

    // Get all messages
    fastify.get('/', async (request, reply) => {
        return reply.send(messages);
    });

    // Get a single message by ID
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const message = messages.find((msg) => msg.id === parseInt(id, 10));

        if (!message) {
            return reply.status(404).send({ error: 'Message not found' });
        }

        return reply.send(message);
    });

    // Update a message by ID
    fastify.put('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { content } = request.body as { content: string };

        if (!content) {
            return reply.status(400).send({ error: 'Content is required' });
        }

        const messageIndex = messages.findIndex((msg) => msg.id === parseInt(id, 10));
        if (messageIndex === -1) {
            return reply.status(404).send({ error: 'Message not found' });
        }

        messages[messageIndex].content = content;
        return reply.send(messages[messageIndex]);
    });

    // Delete a message by ID
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const messageIndex = messages.findIndex((msg) => msg.id === parseInt(id, 10));

        if (messageIndex === -1) {
            return reply.status(404).send({ error: 'Message not found' });
        }

        const deletedMessage = messages.splice(messageIndex, 1)[0];
        return reply.send(deletedMessage);
    });
}