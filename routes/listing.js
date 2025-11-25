import express from 'express';
const router=express.Router();
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/expressError.js';
import {listingSchema,reviewSchema} from '../schema.js';
import Listing from '../models/Listing.js';
import { isLoggedIn ,isOwner,isvalidateListing} from '../middleware.js';
import listingController from '../controllers/listing.js';
import multer from 'multer';
import { storage } from '../cloudConfig.js';
const upload=multer({storage});
//Index route and create route combined
router.route('/').get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),isvalidateListing,wrapAsync(listingController.createListing));
//new route
router.get('/new',isLoggedIn, listingController.newListing);
router.get('/search', wrapAsync(async (req, res) => {
  const searchTerm = req.query.q || '';
  const results = await Listing.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } },
      { city: { $regex: searchTerm, $options: 'i' } }
    ]
  });
  res.render('listings/index', { allListings: results, currentUser: req.user });
}));
//show route and update and delete combined
router.route('/:id').get(wrapAsync (listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),isvalidateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));
//edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.editListing));

export default router;