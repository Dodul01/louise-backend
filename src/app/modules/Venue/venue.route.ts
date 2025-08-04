import express from 'express';
import { VenueController } from './venue.controller';
import { upload } from '../../utils/uploadImage';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-venue', auth('vendor'), upload.single('venue_image'), VenueController.createVenue);
router.get('/get-all-venues', auth('vendor', 'admin'), VenueController.getAllVenues);
router.get('/get-all-venues-wallet', auth('vendor', 'admin'), VenueController.getAllVenuesWallet);
router.get('/get-venue-transactions/:venueId', auth('vendor', 'admin'), VenueController.getVenueTransactions);
<<<<<<< HEAD
router.get('/get-featured-venues', auth('vendor'), VenueController.getFeaturedVenues);
=======
router.patch('/mark-as-paid', auth('vendor', 'admin'), VenueController.markPaymentAsPaid);
router.delete('/delete-single-transaction/:transactionId', auth('vendor', 'admin'), VenueController.deleteSingleTransaction);
>>>>>>> a539ba6e11ddf0a481f29e6ce0af77ba18a30d7d

export const VenueRouter = router;