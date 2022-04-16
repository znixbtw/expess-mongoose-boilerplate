import app from './app';
import config from './config';
import { logger } from './utils';

app.listen(config.env.PORT, () =>
	logger.info(`Server started in ${config.env.NODE_ENV} mode on port ${config.env.PORT}`),
).on('error', (error) => logger.error(error));
