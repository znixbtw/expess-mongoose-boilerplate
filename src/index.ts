import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from '@config';
import { logger, morgan } from '@lib';
import { errorHandler } from '@utils';
import * as routes from '@api/v1';

const app = express();

// Middlewares
app.use(morgan);
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/auth', routes.auth);

// Handlers
app.use(errorHandler.notFound);
app.use(errorHandler.global);

// Start Server
app.listen(config.server.port, () =>
	logger.info(`Server started in ${config.env} mode on port ${config.server.port}`),
).on('error', (error) => {
	logger.error(error);
});
