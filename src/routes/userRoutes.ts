import { Router, Request, Response } from 'express';
import { createUser, getUser } from '../controllers/userController';

const router = Router();

router.post('/create', (req: Request, res: Response) => createUser(req, res));
router.get('/get', (req: Request, res: Response) => getUser(req, res));

export default router;
