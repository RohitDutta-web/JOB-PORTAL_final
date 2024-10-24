import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


// Create a new Express router instance
const router = express.Router();


// Define routes for job-related actions
router.route("/post").post( postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get( getAdminJobs);
router.route("/get/:id").get( getJobById);

export default router;

