import { Router } from 'express';
import { createActivity, getActivityByUserID } from '../controllers/activityController';

const router = Router();

router.post('/create', createActivity);
router.get('/get', getActivityByUserID);
export default router;
