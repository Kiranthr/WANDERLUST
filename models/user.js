import mongoose from 'mongoose';
const {Schema}=mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    }
});
userSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", userSchema);

