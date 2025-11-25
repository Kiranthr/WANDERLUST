// controllers/listing.js
import Listing from '../models/Listing.js';

const index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};
const newListing= async (req, res) => {
    res.render("listings/new.ejs");
};
const showListing= async (req,res)=>{
      let {id}=req.params;
     const listing= await Listing.findById(id).populate({path:'reviews',populate:{path:'author',},
    }).populate('owner');
     if(!listing){
        req.flash('error','Cannot find that listing');
        return res.redirect('/Listings');
        }
     res.render("listings/show.ejs",{listing});
};
const createListing=async (req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash('success','Successfully made a new listing');
    res.redirect('/listings');
};
const editListing=async (req,res)=>{
      let {id}=req.params;
     const listing= await Listing.findById(id);
     if(!listing){
        req.flash('error','Cannot find that listing');
        return res.redirect('/Listings');
        }
     res.render("listings/edit.ejs",{listing});
};
const updateListing=async (req,res)=>{
     if(!req.body.listing) throw new ExpressError(400,'Invalid Listing Data');
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !== 'undefined'){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash('success','Successfully updated the listing');
    res.redirect(`/Listings/${id}`);
};
const deleteListing=async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Successfully deleted the listing');
    res.redirect("/listings");
};
export default { index,newListing,showListing ,createListing,editListing,updateListing,deleteListing};

