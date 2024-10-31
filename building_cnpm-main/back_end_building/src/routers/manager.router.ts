import { Router } from 'express';
import { verifyToken } from '../middleware/authenticate.middleware';
import * as managerControllers from '../controllers/manager.controller';

const router = Router();

router.use(verifyToken);

router.post('/households', managerControllers.addHousehold);
router.get('/households', managerControllers.getHouseholds);
router.put('/households/:id', managerControllers.updateHousehold);
router.delete('/households/:id', managerControllers.deleteHousehold);

router.get('/fee-details', managerControllers.getFeeDetails);
router.get('/fee-details/:id', managerControllers.getFeeDetail);
router.post('/fee-details', managerControllers.addFeeDetail);
router.put('/fee-details/:id', managerControllers.updateFeeDetail);
router.delete('/fee-details/:id', managerControllers.deleteFeeDetail);

router.get('/vehicle-details', managerControllers.getVehicleDetails);
router.get('/vehicle-details/:id', managerControllers.getVehicleDetail);
router.post('/vehicle-details', managerControllers.addVehicleDetail);
router.put('/vehicle-details/:id', managerControllers.updateVehicleDetail);
router.delete('/vehicle-details/:id', managerControllers.deleteVehicleDetail);

router.get('/residents', managerControllers.getResidents);
router.get('/residents/:id', managerControllers.getResident);
router.post('/residents', managerControllers.addResident);
router.put('/residents/:id', managerControllers.updateResident);
router.delete('/residents/:id', managerControllers.deleteResident);

router.post(
	'/voluntary-contributions',
	managerControllers.addVoluntaryContribution,
);
router.put(
	'/voluntary-contributions/:id',
	managerControllers.updateVoluntaryContribution,
);
router.delete(
	'/voluntary-contributions/:id',
	managerControllers.deleteVoluntaryContribution,
);

export default router;
