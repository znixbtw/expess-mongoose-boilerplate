import { Router } from 'express';
import auth from './auth/routes';
import { ratelimit, authorization } from '../../middleware';

const router = Router();

router.use('/auth', ratelimit.auth, auth);
router.use('/user', authorization.verify, auth);

export default router;
