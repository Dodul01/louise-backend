import express from 'express';
import auth from '../../middlewares/auth';
import { policyController } from './privacyPolicy.controller';

const router = express.Router();

router.post('/create-privacy-policy', auth('vendor', 'admin'), policyController.createPrivacyPolicy);
router.patch('/update-privacy-policy/:policyId', auth('vendor', 'admin'), policyController.updatePrivacyPolicy);

export const PrivacyRoute = router;