import express from 'express';
import auth from '../../middlewares/auth';
import { changePasswordController } from './changePassword.controller';

const router = express.Router();

router.post('/change-password', auth('admin'), changePasswordController.changePassword);

export const ChangePasswordRouter = router;