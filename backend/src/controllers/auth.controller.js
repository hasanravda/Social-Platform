import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist, use a different email!" });
        }

        // For Random Profile Picture
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({ // Create a new user in the database 
            fullName,
            email,
            password,
            profilePicture: randomAvatar,
        });

        // Create the user in Stream also 
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePicture || "",
            });
            console.log(`Stream user created for ${newUser.fullName}`);
        } catch (error) {
            console.error("Error creating Stream user:", error);
        }

        const token = jwt.sign({ // Payload for JWT - contains user information 
            userId: newUser._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });

        // Set the JWT token in a cookie
        // This cookie will be used for authentication in subsequent requests
        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true, // Prevent XSS attacks
            sameSite: "strict", // Prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        // Respond with the new user data
        // This will be used to display the user information on the frontend
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function login(req, res) {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found, please signup!" });
        }

        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign({ // This token will be used for authentication in subsequent requests
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });

        res.cookie("jwt", token, { // Set the JWT token in a cookie
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true, // Prevent XSS attacks
            sameSite: "strict", // Prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({ // Respond with the user data and success message
            success: true,
            user,
            message: "User logged in successfully",
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export function logout(req, res) {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "User logged out successfully" });
}

export async function onboard(req,res){
    console.log("Onboarding user:", req.user);

    try {
        const userId = req.user._id;
        const {fullName, bio , nativeLanguage, learningLanguage, location} = req.body;

        if(!fullName || !bio ||  !location) {
            return res.status(400).json({ 
                message: "Please fill all the fields", 
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !location && "location",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage"
                ].filter(Boolean) 
            });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user in Stream as well
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePicture || "",
            });
            console.log(`Stream user updated for ${updatedUser.fullName}`);
        } catch (error) {
            console.error("Error updating Stream user:", error);
        }

        res.status(200).json({
            success: true,
            message: "User onboarded successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error during onboarding:", error);   
        return res.status(500).json({ message: "Internal server error" }); 
    }
}