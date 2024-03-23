import { response } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    //get user detail from frontend
    //validation--not empty
    //check if user already exist:username/email
    //check for images, avatar
    //upload them to cloudinary, avatar
    //create user object- create entry in db
    //remove password and refresh token field from response
    // check for user creation
    //retrun response

    //user detail

    const {fullname,email,username,password} = req.body
    console.log("email",email)

    //validation
    if ([fullname,email,username,password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are reuired")
    }

    const existedUser = await User.findOne({
        $or: [{username }, {email}]
    })
    if (existedUser) {
        throw new ApiError(409,"User with email or username already exists")

    }

    //check for avatar and email
    const avatarLocalPath = req.files?.avatar[0]?.path;

    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const coverImageLocalPath = req.files && req.files.coverImage && req.files.coverImage.length > 0 ? req.files.coverImage[0].path : null;

    //check avtar
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is not uploaded through multer")
    }


    //upload on cloudonary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    //check avatar is uploaded or not
    if (!avatar) {
        throw new ApiError(400, "Avatar file is not ulploaded on cloudinary")
    }


    //create object and entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "error in registring the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})
export { registerUser }