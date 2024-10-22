import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv"
dotenv.config();


// Register a new user
export const register = async (req, res) => {
    try {
        // Extract user data from the request body

        const { fullname, email, phoneNumber, password, role } = req.body;
        // Check if all required fields are present

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "missing credentials",
                success: false
            });
        };
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Please Upload picture",
                success: false
            });
        }



        // Get the uploaded file and upload it to Cloudinary

        const fileUri = getDataUri(req.file);
        let cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if a user with the same email already exists

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already registered',
                success: false,
            })
        }
        // Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// Login an existing user

export const login = async (req, res) => {
    try {
        // Extract user data from the request body

        const { email, password, role } = req.body;
        // Check if all required fields are present

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "missing credentials",
                success: false
            });
        };
        // Find the user by email

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect credentials",
                success: false,
            })
        }
        // Compare the provided password with the stored password

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect credentials",
                success: false,
            })
        };
        // Check if the provided role matches the user's role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        // Return the user data and the token

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Logout a user

export const logout = async (req, res) => {
    try {
        // Clear the token cookie

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update a user's profile

export const updateProfile = async (req, res) => {
    try {
        // Extract user data from the request body

        const { fullname, email, phoneNumber, bio, skills } = req.body;
        // Get the uploaded file
        let file;
        let fileUri;
        let cloudResponse;
        if (req.file) {
            file = req.file;
            // Upload the file to Cloudinary
            fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }



        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        // Get the user ID from the authentication middleware

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // Update the resume if a new file is uploaded
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}