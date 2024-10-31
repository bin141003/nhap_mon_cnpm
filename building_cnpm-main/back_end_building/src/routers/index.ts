import { Router } from 'express';

import authRoute from './auth.router';
import adminRoute from './admin.router';
import publicRoute from './public.router';
import managerRoute from './manager.router';

const router = Router();

router.use('/auth', authRoute);

router.use('/admin', adminRoute);

router.use('/public', publicRoute);

router.use('/manager', managerRoute);
router.use('/health', (req, res) => {
	return res.send('Server starting');
});

export { router };
