import { Router } from 'express';
import { createLocation, getLocationByActivityId } from '../controllers/locationController';

const router = Router();

router.post('/create', createLocation);
router.get('/get', getLocationByActivityId);

export default router;
