import { Job } from "../models/job.model.js";

// Post a new job (admin only)

export const postJob = async (req, res) => {
    try {
            // Extract job data from the request body
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

            // Check if all required fields are present

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "missing credentials",
                success: false
            })
        };
            // Create a new job

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

            // Return a success response with the new job
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// Get all jobs (student only)
export const getAllJobs = async (req, res) => {
    try {

         // Get the keyword from the query string
        const keyword = req.query.keyword || "";
            // Create a query to search for jobs by title or description

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

            // Find all jobs that match the query and populate the company field

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
            // Check if any jobs were found

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
            // Return a success response with the jobs

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// Get a job by ID (student only)
export const getJobById = async (req, res) => {
    try {
            // Get the job ID from the URL parameters
        const jobId = req.params.id;
            // Find the job by ID and populate the applications field

        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
            // Return a success response with the job

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// Get all jobs created by the current admin (admin only)
export const getAdminJobs = async (req, res) => {
    try {
            // Get the admin ID from the authentication middleware
        const adminId = req.id;
            // Find all jobs created by the admin and populate the company field

        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
