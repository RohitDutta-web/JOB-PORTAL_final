//importing necessary modules
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

//load env variables from .env file
dotenv.config({});

//creating an instance of the express.js app
const app = express();

// middleware configuration----------
//parse json bodies
app.use(express.json());
//parse URL-encoded bodies with extended syntax
app.use(express.urlencoded({ extended: true }));
//parsing cookies
app.use(cookieParser());

//cors configuration-------------------
const corsOptions = {
    origin:[process.env.CLIENT_BASED_URL],//allows req from mentioned localhost
    credentials:true
}
app.use(cors(corsOptions));


//setting port for the server 
const PORT = process.env.PORT || 3000;




// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);




//start the server and connect to database 
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})