import express from 'express';
import { VenueController } from './venue.controller';
import { upload } from '../../utils/uploadImage';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-venue', auth('vendor'), upload.single('venue_image'), VenueController.createVenue);
router.get('/get-all-venues', auth('vendor', 'admin'), VenueController.getAllVenues);
router.get('/get-all-venues-wallet', auth('vendor', 'admin'), VenueController.getAllVenuesWallet);
router.get('/get-venue-transactions/:venueId', auth('vendor', 'admin'), VenueController.getVenueTransactions);

export const VenueRouter = router;