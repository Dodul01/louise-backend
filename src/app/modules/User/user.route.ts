import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.get('/get-all-users', auth('admin', 'vendor'), UserControllers.getAllUsers);

export const UserRouter = router;