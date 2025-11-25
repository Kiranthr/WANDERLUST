import ExpressError from './utils/expressError.js';
import Listing from './models/Listing.js';
import { listingSchema } from './schema.js';
import { reviewSchema } from './schema.js';
import Review from './models/review.js';


export function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};
export function saveRedirectUrl(req,res,next){
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }   
    next();
};
export async function isOwner (req, res, next) {
    let { id } = req.params;
    let  listing =  await Listing.findById(id);
    // if (!listing.owner.equals(req.user._id)) {
    if (!listing || !listing.owner || !req.user || listing.owner.toString() !== req.user._id.toString()) {

        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/Listings/${id}`);
    }   
    next();
};
export function  isvalidateListing(req,res,next){
    let {error}=listingSchema.validate(req.body);
    if(error){
     let errMsg=error.details.map(el=>el.message).join(',');
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
export function validateReview(req,res,next){
    let {error}=reviewSchema.validate(req.body);
    if(error){
     let errMsg=error.details.map(el=>el.message).join(',');
     throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
export async function isreviewAuthor (req, res, next) {
    let { id,reviewId } = req.params;
    let  review =  await Review.findById(reviewId);
    // if (!listing.owner.equals(req.user._id)) {
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not the author of this review!');
        return res.redirect(`/listings/${id}`);
    }   
    next();
};


