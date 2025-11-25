import Review from '../models/review.js';
import Listing from '../models/Listing.js';

const postReview=async (req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    await newReview.save();
    listing.reviews.push(newReview); 
    await listing.save();
    req.flash('success','Review added successfully');
    
    console.log("review added");
    res.redirect(`/listings/${listing._id}`);
};
const deleteReview=async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review deleted successfully');
    res.redirect(`/listings/${id}`);
};
export default {postReview,deleteReview};
