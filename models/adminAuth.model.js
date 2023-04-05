import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    userName: {type: String , required: true},
    email: {type: String, required: true},
    password: {type: String}
});

export default mongoose.model("Admin", adminSchema);