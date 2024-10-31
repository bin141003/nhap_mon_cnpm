import { Router } from 'express';
import { isAdmin, verifyToken } from '../middleware/authenticate.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { registerSchema } from '../validators/auth.validator';
import * as adminControllers from '../controllers/admin.controller';

const router = Router();

router.post(
	'/register',
	validateBody(registerSchema),
	verifyToken,
	isAdmin,
	adminControllers.register,
);

router.use(verifyToken, isAdmin);

router.get('/users', adminControllers.getUsers);
router.put('/users/:id', adminControllers.updateUser);
router.delete('/users/:id', adminControllers.deleteUser);

router.post('/fees', adminControllers.addFee);
router.put('/fees/:id', adminControllers.updateFee);
router.delete('/fees/:id', adminControllers.deleteFee);

router.post('/vehicle-types', adminControllers.addVehicleType);
router.put('/vehicle-types/:id', adminControllers.updateVehicleType);
router.delete('/vehicle-types/:id', adminControllers.deleteVehicleType);

export default router;
