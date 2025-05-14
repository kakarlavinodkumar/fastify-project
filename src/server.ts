import fastify from 'fastify';
import { Entity, PrimaryGeneratedColumn, Column, Repository } from 'typeorm';
import fastifyORMPlugin from 'typeorm-fastify-plugin';

import { registerPlugins } from './plugins/index';
import { config } from './config/config';

import { User } from './database/entities/country';
import { Message } from './database/entities/message';

export const start = async () => {
  const app = fastify({ logger: true });

  try {
    registerPlugins(app);

    app.register(fastifyORMPlugin, {
      host: 'localhost',
      port: 5432,
      type: 'postgres',
      database: 'postgres',
      username: 'postgres',
      password: 'postgres',
      synchronize: true, // Automatically sync schema (use cautiously in production)
      logging: true,
      entities: [Message], // Register the User entity here
    }).ready();

    await app.after();
    // const { DataSource } = app.orm;

    // await DataSource.initialize(); // Ensure DataSource is initialized
    const userRepository: Repository<User> = app.orm.getRepository(User);

    // await DataSource.synchronize();

    // Example query: Insert a new user
    await userRepository.save({ name: 'John Doe2', email: 'john.doe3@example.com' });

    // Example query: Fetch all users
    const users = await userRepository.find();
    console.log('Users:', users);

    await app.listen({ port: config.PORT });
    console.log('Server is running at http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};