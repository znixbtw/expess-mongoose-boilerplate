import { Router } from 'express';
import { errorHandler } from '../../../utils';
import validator from './validator';
import controller from './controller';

const { handler } = errorHandler;

/**
 * Auth Routes
 */
const router = Router();

router.post('/login', validator.login, handler(controller.login));
router.post('/register', validator.register, handler(controller.register));

export default router;
