import express from 'express';
import health from './health/health';
import user from './user/user';
import role from './role/role';
import login from './authentication/login';

const router = express.Router();

router.use('/health', health);
router.use('/users', user);
router.use('/roles', role);
router.use('/auth', login);

export default router;
