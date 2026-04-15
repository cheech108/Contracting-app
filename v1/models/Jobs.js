import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: "you need a title",
            max:50
        },
        positions: {
            // {"position name":pay}
            type:Map,
            required: "you need to have at least 1 position",
        },
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            required: "a creator id is needed"
        },
        contractors:{
            // {"user id":{"position":"position name","quickbooksid",""}}
            type:Map
        },
        form:{
            type:mongoose.Schema.Types.ObjectId,
            required: "a form id is needed, this is a technical error and is not the users fault."
        }
    }
)

export default mongoose.model("jobs", JobSchema);