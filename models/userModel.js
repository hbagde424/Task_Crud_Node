import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Require"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, " Email is Require"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);
// middelwares

// FUNCTIONS 
userSchema.pre("save", async function(next){
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
})


//compare password
userSchema.methods.comparepassward = async function(plainpassword){
  return await bcrypt.compare(plainpassword, this.password);

};


//JSON WEBTOKEN

userSchema.methods.genrateToken = function(){
  return JWT.sign({_id: this._id}, process.env.JWT_SECRET,{
    expiresIn: "7d",
  })
}

export default mongoose.model("User", userSchema);
