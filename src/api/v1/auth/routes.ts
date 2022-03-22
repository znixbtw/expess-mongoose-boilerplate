import { Router } from 'express';

import validator from './validator';
import controller from './controller';
import { validateInput } from '../../../middleware';

const router = Router();

router.post('/login', validator.login, validateInput, controller.login);

export default router;
