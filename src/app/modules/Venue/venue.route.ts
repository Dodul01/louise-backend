import express from 'express';
import { VenueController } from './venue.controller';
import { upload } from '../../utils/uploadImage';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-venue', auth('admin'), upload.single('venue_image'), VenueController.createVenue);
router.get('/get-all-venues', auth('admin', 'user'), VenueController.getAllVenues);
router.get('/get-all-venues-wallet', auth('admin'), VenueController.getAllVenuesWallet);
router.get('/get-venue-transactions/:venueId', auth('admin'), VenueController.getVenueTransactions);
router.get('/get-featured-venues', auth('user'), VenueController.getFeaturedVenues);
router.patch('/mark-as-paid', auth('admin'), VenueController.markPaymentAsPaid);
router.patch('/block-venue', auth('admin'), VenueController.blockVenue);
router.patch('/unblock-venue', auth('admin'), VenueController.unblockVenue);
router.delete('/delete-single-transaction/:transactionId', auth('admin'), VenueController.deleteSingleTransaction);


export const VenueRouter = router;