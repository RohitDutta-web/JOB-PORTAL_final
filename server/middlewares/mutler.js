// Multer library for handling multipart/form-data requests
import multer from "multer";

// Create a memory storage engine for Multer
const storage = multer.memoryStorage();

// Create a Multer instance with the memory storage engine
export const singleUpload = multer({storage}).single("file");