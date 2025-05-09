import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface Template {
    id: string;
    name: string;
    content: string;
}

const templates: Template[] = [];

export async function templateRoutes(fastify: FastifyInstance) {
    // Create a new template
    fastify.post('/', async (request: FastifyRequest<{ Body: Template }>, reply: FastifyReply) => {
        const newTemplate = request.body;
        templates.push(newTemplate);
        reply.code(201).send(newTemplate);
    });

    // Get all templates
    fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
        reply.send(templates);
    });

    // Get a single template by ID
    fastify.get('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = request.params;
        const template = templates.find((t) => t.id === id);
        if (!template) {
            reply.code(404).send({ message: 'Template not found' });
        } else {
            reply.send(template);
        }
    });

    // Update a template by ID
    fastify.put('/:id', async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Template> }>, reply: FastifyReply) => {
        const { id } = request.params;
        const updatedData = request.body;
        const templateIndex = templates.findIndex((t) => t.id === id);

        if (templateIndex === -1) {
            reply.code(404).send({ message: 'Template not found' });
        } else {
            templates[templateIndex] = { ...templates[templateIndex], ...updatedData };
            reply.send(templates[templateIndex]);
        }
    });

    // Delete a template by ID
    fastify.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        const { id } = request.params;
        const templateIndex = templates.findIndex((t) => t.id === id);

        if (templateIndex === -1) {
            reply.code(404).send({ message: 'Template not found' });
        } else {
            templates.splice(templateIndex, 1);
            reply.code(204).send();
        }
    });
}