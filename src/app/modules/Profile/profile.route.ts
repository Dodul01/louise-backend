import express from 'express';
import { ProfileController } from './profile.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/uploadImage';

const router = express.Router();

router.get('/get-edit-profile/:userId', auth('vendor', 'admin', 'user'), ProfileController.getEditProfile);
router.patch('/edit-profile/:userId', upload.single('profile_image'), auth('vendor', 'admin', 'user'), ProfileController.editProfile);

export const ProfileRouter = router;