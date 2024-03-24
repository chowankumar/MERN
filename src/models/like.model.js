import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"

    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"

    },
    likeBy: {
        type: Schema.Types.ObjectId,
        ref: "User"

    }
},{timestamps:true})

export const Like = mongoose.model("Like",likeSchema)