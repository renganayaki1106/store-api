import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/userAuth.route.js"
import adminRouter from "./routes/adminAuth.route.js"

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))

dotenv.config()

const port = process.env.PORT;

app.get("/", (req,res) => {
    res.send("Welcome to Store API")
})



app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})

mongoose.connect(process.env.MONGODB_URL) .then((res) => {
    console.log("Mongodb connection established successfully");
})
.catch((err) => console.log(err));