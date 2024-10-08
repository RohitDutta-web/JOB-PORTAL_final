import mongoose from "mongoose";


// Define the company schema
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
      // User ID field (reference to User model)
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, { timestamps: true })

// Create a Mongoose model from the schema
export const Company = mongoose.model("Company", companySchema);