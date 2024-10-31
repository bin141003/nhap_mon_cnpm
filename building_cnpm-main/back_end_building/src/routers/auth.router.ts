import { Router } from 'express';

import * as auth from '../controllers/auth.controller';
import { validateBody } from '../middleware/validation.middleware';
import { loginSchema } from '../validators';

const router = Router();

router.post('/login', validateBody(loginSchema), auth.login);

export default router;
