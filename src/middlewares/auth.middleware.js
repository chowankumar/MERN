import {asyncHandler} from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model"


export const verifyJWT = asyncHandler(async(req,_,next)=>{
  try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
  
     if(token){
      throw new ApiError(401,"unauthorized request")
     }
  
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
  
    const user = await User.findById(decodedToken?._id)
     .select("-password -refreshToken")
  
  
     if(!user){
  
         //NEXT_VIDEO: discuss about the frontend
         throw new  ApiError(401,"Invalid access token")
  
     }
  
  
     req.user = user;
     next();
  } catch (error) {
    throw new ApiError(401,"invalid acces token")
    
  }


})