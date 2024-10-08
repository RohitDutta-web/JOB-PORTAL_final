import mongoose from "mongoose";

// Define the application schema
const applicationSchema = new mongoose.Schema({
    job: {
         // Job field (reference to Job model)
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
      // Applicant field (reference to User model)
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
      // Status field (enum with values 'pending', 'accepted', or 'rejected')

    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
}, { timestamps: true });
// Create a Mongoose model from the schema
export const Application  = mongoose.model("Application", applicationSchema);