import { token } from "morgan";
import userModel from "../models/userModel.js";
import express from "express";


// registraion
export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  
  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    
  }
  const user = await userModel.create({ name, email, password });
  //token
//   const token = user.createJWT();
  res.status(201).send({
    sucess: true,
    message: "User Created Successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      location: user.location,
    },
    // token,
  });
};

export const userLogin = async (req, res)=>{

  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(500).send({
      success: false,
      message: "filed all inputes"
    })
  }
  const user = await userModel.findOne({email})
  if (!user) {
    return res.status(500).send({
      success: false,
      message: "this user not Register"
    })
  }

  const isMatch = await user.comparepassward(password);
  if (!isMatch) {
    return res.status(501).send({
      success: false,
      message: "password wrong"
    })
  }
  const token = user.genrateToken();
  res.status(201).cookie("token", token, {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
  }).send({
    success: true,
    message: "user login",
    token,
    user
  }) 

}

export const GetAllProfile = async (req, res)=>{
  try {
    const user = await userModel.findById(req.user._id)
    res.status(201).send({
      success: true,
      message: "Here is all user Details",
      
      user
    })
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success: false,
      message: "you has not permited"
    })
  }
  
}

export const logoutIsAuth = async (req, res)=>{
  try {
   
    res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now())
    })
    .send({
      success: true,
      message: "Logout Successfully..."
    })
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success: false,
      message: "Not Logout"
    })
  }
}


export const updateProfileController = async (req, res)=>{
  try {
    const {name, lastName, email, location} = req.body
    const user = await userModel.findById(req.user._id)
    // validation + Update
    if(name) user.name = name
    if(lastName) user.lastName = lastName
    if(email) user.email = email
    if(location) user.location = location
    // save user
    await user.save()
    
    res.status(200).send({
      success: true,
      message: "It's Update"
    })
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success: false,
      message: "Not Update"
    })
  }

}
export const updatePasswordController = async (req, res)=>{
  try {
    const{OldPassword, Newpassword} = req.body
    const user = await userModel.findById(req.user._id)
    if(!OldPassword || !Newpassword){
      return res.status(404).send({
        success: false,
        message: "Provide All Fileds"
      })
    }
    const ismatch = await user.comparepassward(OldPassword);
    if (!ismatch) {
      res.status(404).send({
        success: false,
        message: "Enter a vailed Password"
      })
      
    }
    user.password = Newpassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "your password has been saved"
    })

    
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success: false,
      message: "Password not Update"
    })
  }
}