import express from 'express';
import auth from '../../middlewares/auth';
import { policyController } from './privacyPolicy.controller';

const router = express.Router();

router.post('/create-privacy-policy', auth('admin'), policyController.createPrivacyPolicy);
router.patch('/update-privacy-policy/:policyId', auth('admin'), policyController.updatePrivacyPolicy);
router.get('/get-privacy-policy/:policyId', policyController.getPrivacyPolicy);

export const PrivacyRoute = router;