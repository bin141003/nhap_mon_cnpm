import { Router } from 'express';
import * as publicControllers from '../controllers/public.controller';

const router = Router();

router.get('/fees', publicControllers.getFees);

router.get('/vehicle-types', publicControllers.getVehicleTypes);

router.get('/households', publicControllers.getHouseholds);

router.get('/households/count', publicControllers.getHouseholdCount);

router.post('/households/:id', publicControllers.checkHousehold);

router.get('/households/:id', publicControllers.getHousehold);

router.get(
	'/voluntary-contributions',
	publicControllers.getVoluntaryContributions,
);

export default router;
