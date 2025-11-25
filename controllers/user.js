import User from '../models/user.js';

const userSignup=(req,res)=>{
    res.render("users/signup.ejs");
};
const sighupPost=async(req,res,next)=>{
    try{
        let {email,username,password}=req.body.user;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err)return next(err);
             req.flash("success","Welcome to wanderlust");
             res.redirect('/Listings');
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect('/signup');
    }
};
const loginPost=(req,res)=>{
    res.render("users/login.ejs");
};
const postUserLogin=async(req,res)=>{
    req.flash("success","Welcome back!");
    let redirectUrl=res.locals.redirectUrl || '/Listings';
    res.redirect(redirectUrl);
};
const logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){return next(err);}
        req.flash("success","Logged you out!");
        res.redirect('/listings');

    })
};
export default {userSignup,sighupPost,loginPost,postUserLogin,logoutUser};