import express from 'express';
import { VenueController } from './venue.controller';
import { upload } from '../../utils/uploadImage';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-venue', auth('vendor'), upload.single('venue_image'), VenueController.createVenue);

export const VenueRouter = router;