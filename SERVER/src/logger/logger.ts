import { pino } from 'pino';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdirSync } from 'fs';

// Create logs directory
const logsDir = join(__dirname, '../../logs');
mkdirSync(logsDir, { recursive: true });

// Define log file path
const logFilePath = join(logsDir, 'app.log');
const logStream = createWriteStream(logFilePath, { flags: 'a' });

// Check if in production
const isProduction = process.env.NODE_ENV === 'production';

// Create logger with conditional transports based on environment
const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    transport: isProduction
      ? undefined
      : {
          targets: [
            {
              target: 'pino-pretty',
              level: 'info',
              options: {
                destination: 1, // Log to console in development
              },
            },
            {
              target: 'pino/file',
              options: {
                destination: logFilePath, // Log to file
                mkdir: true,
              },
            },
          ],
        },
  },
  logStream
);

export default logger;
