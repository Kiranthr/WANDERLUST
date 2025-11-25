import express from 'express';;
const router=express.Router({mergeParams:true});
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';
import {reviewSchema} from '../schema.js';
import Listing from '../models/Listing.js';
import Review from '../models/review.js';
import { validateReview,isLoggedIn,isreviewAuthor } from '../middleware.js';
import  reviewController from '../controllers/review.js';
//Review routes can be added here
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview));
//review delete route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.deleteReview));
export default router;
