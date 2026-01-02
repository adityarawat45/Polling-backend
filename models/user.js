import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = Schema({
    username : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["Voter", "Creator"]
    }
    
})

export default mongoose.model("User", userSchema);