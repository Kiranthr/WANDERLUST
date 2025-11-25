
import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
     author: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
 
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
