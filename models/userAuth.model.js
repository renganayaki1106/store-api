import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    userName: {type: String , required: true},
    email: {type: String, required: true},
    phone: {type: String},
    password: {type: String}
});

export default mongoose.model("User", userSchema);