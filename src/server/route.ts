import { FastifyInstance } from 'fastify';

import { flightRoutes } from "./flights/api/route";
import { messageRoutes } from "./messages/api/route";
import { templateRoutes } from "./templates/api/route";
import { healthCheckRoutes } from "./healthchecks/api/route";

export async function setupRoutes(app: FastifyInstance) {
    app.register(flightRoutes, { prefix: '/flights' });
    app.register(messageRoutes, { prefix: '/messages' });
    app.register(templateRoutes, { prefix: '/templates' });
    app.register(healthCheckRoutes, { prefix: '/healthchecks'});
}
