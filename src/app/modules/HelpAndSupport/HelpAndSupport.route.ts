import express from 'express';
import { HelpAndSupportController } from './HelpAndSupport.controller';
import { upload } from '../../utils/uploadImage';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post('/create-help-and-support', auth('admin'), upload.single('help_and_support_image'), HelpAndSupportController.createHelpAndSupport);
route.get('/get-help-and-support/:helpId', HelpAndSupportController.getHelpAndSupport);
route.patch('/update-help-and-support/:helpId', auth('admin'), upload.single('help_and_support_image'), HelpAndSupportController.updateHelpAndSupport);

export const HelpAndSupportRouter = route;