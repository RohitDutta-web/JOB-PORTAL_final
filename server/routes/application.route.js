import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 

// Create a new Express router instance
const router = express.Router();


// Define routes for job-application-related actions
router.route("/apply/:id").get( applyJob);
router.route("/get").get( getAppliedJobs);
router.route("/:id/applicants").get( getApplicants);
router.route("/status/:id/update").post( updateStatus);
 

export default router;

