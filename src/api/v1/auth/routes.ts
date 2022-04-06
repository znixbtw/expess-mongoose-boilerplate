import { Router } from 'express';
import { validateInput } from '@middleware';
import { errorHandler } from '@utils';
import validator from './validator';
import controller from './controller';

const { handler } = errorHandler;
const router = Router();

router.post('/login', validator.login, validateInput, handler(controller.login));

export default router;
