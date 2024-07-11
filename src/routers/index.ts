import { Router } from 'express';
import { AuthRouter } from './auth.router';

const router = Router();

router.use('/auth', new AuthRouter().router);

export default router;
