import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { morgan, ratelimit } from './middleware';
import { errorHandler } from './utils';
import routes from './api/v1';

const app = express();

// Middlewares
app.use(morgan);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(ratelimit.global);

// Routes
app.use('/v1', routes);

// Handlers
app.use(errorHandler.notFound);
app.use(errorHandler.global);

export default app;
