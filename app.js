// if(process.env.NODE_ENV !== 'production'){
//     console.log("loading dev env variables");
//     import('dotenv/config');
// }
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(".env") });
import 'dotenv/config';
// console.log(process.env);
import express from 'express';
import mongoose from 'mongoose';

import { fileURLToPath } from "url";
import path from "path";
import methodOverride from 'method-override';

import ejsMate from 'ejs-mate';
import session from 'express-session';
// import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';


// Create __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import listings from './routes/listing.js';
import reviews from './routes/review.js';
import user from './routes/user.js';
const app = express();
const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
      console.log(err);
});
async function main(){
   await mongoose.connect(dbUrl);
}
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,'/public')));
// const store=MongoStore.create({
//     mongoUrl:dbUrl,
//     crypto:{
//         secret:process.env.SECRET;
//     },
//     touchAfter:24*3600,
// });
// store.on("error",()=>{
//     console.log("Error in Mongo session store",err);
// });
const sessionOptions = {
    secret: process.env.SECRET|| "mysupersecret",     
    resave: false,
    saveUninitialized: true,   
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/demouser',async(req,res)=>{
    let fakeUser =new User({email:'student@gmail.com',username:"delta-student"});
    let registeredUser=await User.register(fakeUser,"mypassword");
    res.send(registeredUser);
});
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser=req.user;
  next();
});
app.use('/Listings',listings);
app.use('/Listings/:id/reviews',reviews);
app.use('/',user);

// 404 route
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,'page not found'));
// });

// Error handling middleware
app.use((err,req,res,next)=>{
    let {statuscode=500,message='Something went wrong'}=err;
    res.status(statuscode).render("listings/Error.ejs",{message});
    
});
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
