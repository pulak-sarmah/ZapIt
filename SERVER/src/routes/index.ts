import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../errors/CustomError';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Welcome to Zapit API!' });
  });

  fastify.get(
    '/health',
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ status: 'OK' });
    }
  );
  fastify.get(
    '/error',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request: FastifyRequest, reply: FastifyReply) => {
      throw new CustomError('This is an error', 400);
    }
  );
}
