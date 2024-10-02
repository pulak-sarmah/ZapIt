import { FastifyInstance } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import indexRoutes from './routes';

export default async function app(fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: true,
  });

  fastify.register(indexRoutes, { prefix: '/api/v1' });
}
