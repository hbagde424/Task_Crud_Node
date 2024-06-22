import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";


export const isAuth = async (req, res, next)=>{
    const{token} = req.cookies;
    if (!token) {
        res.status(201).send({
            success: false,
            message: "unAthenticate user"
          })
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    next();

};