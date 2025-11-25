import mongoose from 'mongoose';
const Schema =mongoose.Schema;
import Review from './review.js';
const listingSchema=new Schema({
    title:{
        type:String,
    required:true,
},
    description:String,
    // image:{
    //    type: String,
    //    default:"https://unsplash.com/photos/golden-gate-bridge-seen-through-trees-and-foliage-yYJ0vHwrrAU",
    // set:(v)=>
    //    v===""?"https://unsplash.com/photos/golden-gate-bridge-seen-through-trees-and-foliage-yYJ0vHwrrAU":v,
    // },
    image: {
  url:String,
  filename: String,
},
    price:Number,
    location:String,
    country:String,
    reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User',
    },
});
listingSchema.post("findOneAndDelete",async function(listing){
    if(listing){
        await mongoose.model("Review").deleteMany({ _id: { $in: listing.reviews } });
    }
});
const listing=mongoose.model("Listing",listingSchema);
export default listing;