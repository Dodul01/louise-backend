import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.get('/get-all-users', auth('admin', 'vendor'), UserControllers.getAllUsers);
router.patch('/block-user', auth('admin', 'vendor'), UserControllers.blockUser);
router.patch('/unblock-user', auth('admin', 'vendor'), UserControllers.unblockUser);
router.get('/get-user/:userId', auth('admin', 'vendor'), UserControllers.getSingleUser);

export const UserRouter = router;