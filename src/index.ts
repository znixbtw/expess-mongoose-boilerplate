import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger } from './utils';

mongoose
	.connect(config.env.MONGO_URI)
	.then(() => {
		logger.info(`Database connected.`);
		app.listen(config.env.PORT, () =>
			logger.info(`Server started in ${config.env.NODE_ENV} mode on port ${config.env.PORT}`),
		).on('error', (error) => logger.error(error));
	})
	.catch((error) => {
		logger.error(error);
	});
