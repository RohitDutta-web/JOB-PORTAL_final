import mongoose from "mongoose";
import dotenv from "dotenv"
// Load environment variables from .env file
dotenv.config({})


// Define an asynchronous function to connect to the database
const connectDB = async () => {
    try {
         // Attempt to connect to the MongoDB instance using the MONGO_URI environment variable
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;