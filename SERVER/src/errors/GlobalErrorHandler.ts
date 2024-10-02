import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../logger/logger';
import { CustomError } from './CustomError';

const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  logger.error({ err: error, url: request.url }, 'An error occurred');

  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const isProduction = process.env.NODE_ENV === 'production';

  reply.status(statusCode).send({
    statusCode,
    message: isProduction ? 'Internal Server, Error' : error.message,
    error: isProduction ? 'Internal Server, Error' : error.stack,
  });
};

export default errorHandler;
