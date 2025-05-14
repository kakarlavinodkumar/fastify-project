import fastify from 'fastify';

import { registerPlugins } from './plugins/index';
import { config } from './config/config';

export const start = async () => {
  const app = fastify({ logger: true });

  try {
    registerPlugins(app);

    await app.listen({ port: config.PORT });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};