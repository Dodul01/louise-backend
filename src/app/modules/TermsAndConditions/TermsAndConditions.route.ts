import express from "express";
import auth from "../../middlewares/auth";
import { termsController } from "./TermsAndConditions.controller";

const router = express.Router();

router.post('/create-terms-and-conditions', auth('vendor', 'admin'), termsController.createTermsAndCondition);
router.get('/get-terms-and-conditions/:termsId', auth('vendor', 'admin'), termsController.getTermsAndCondition);
router.patch('/update-terms-and-conditions/:termsId', auth('vendor', 'admin'), termsController.updateTermsAndCondition);

export const TermsRoute = router;