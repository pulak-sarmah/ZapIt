import * as dotenv from 'dotenv';
import Fastify from 'fastify';
import app from './app';
import logger from './logger/logger';
import errorHandler from './errors/GlobalErrorHandler';

dotenv.config();

const server = Fastify({
  logger: false,
});

server.log = logger;

server.register(app);

server.setErrorHandler(errorHandler);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await server.listen({ port: PORT as number });

    logger.info(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
