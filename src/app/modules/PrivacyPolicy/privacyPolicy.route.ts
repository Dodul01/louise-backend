import express from 'express';
import auth from '../../middlewares/auth';
import { policyController } from './privacyPolicy.controller';

const router = express.Router();

router.post('/create-privacy-policy', auth('vendor', 'admin'), policyController.createPrivacyPolicy);
router.patch('/update-privacy-policy/:policyId', auth('vendor', 'admin'), policyController.updatePrivacyPolicy);
router.get('/get-privacy-policy/:policyId', auth('vendor', 'admin'), policyController.getPrivacyPolicy);

export const PrivacyRoute = router;