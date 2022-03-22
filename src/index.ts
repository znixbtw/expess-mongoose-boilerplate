import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { logger, errorHandler } from './lib';
import config from './config';
import * as routes from './api/v1';

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/v1/auth', routes.auth);

app.use(errorHandler.notFound);
app.use(errorHandler.global);

app.listen(config.server.port, () =>
	logger.info(`Server started in ${config.env} mode on port ${config.server.port}`),
).on('error', (error) => {
	logger.error(error);
});
