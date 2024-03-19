// require('dotenv').config({path: './env'})


import connectDB from "./db/index.js"
import dotenv from "dotenv";


dotenv.config({
    path: './env'
})
connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
    console.log(`server us running at port : ${process.env.PORT}`)
    });
})
.catch((error)=>{
  console.log("mongo db conection failed !!! ", err)
})








// import mongoose from "mongoose";
// import { DB_NAME } from "./constants"
// import express from "express"

// const app = express();

// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on(error, (error) => {
//             console.log("ERROR", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`app is listening in the port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error(error);
//         throw error

//     }
// })()