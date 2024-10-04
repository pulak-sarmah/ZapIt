import { FastifyInstance } from 'fastify';
import indexRoutes from './routes';

export default async function app(fastify: FastifyInstance) {
  fastify.register(indexRoutes, { prefix: '/api/v1' });

  const { buildAdminRouter } = await import('./config/adminSetup.mjs');

  await buildAdminRouter(fastify);
}
