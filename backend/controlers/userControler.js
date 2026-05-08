
import bcrypt from 'bcryptjs'
import { User } from "../models/userModel.js";
import JWT from 'jsonwebtoken';
export const userRegister = async (req, res) => {
    try {
        const { username, fullPassword, password, gender } = req.body;
        if (!username || !password || !gender || !fullPassword) {
            return res.status(400).json({
                success: false,
                message: 'fill all data in register form'
            })
        }
        let profilePicture = "";
        if (password !== fullPassword) {
            return res.status(400).json({
                success: false,
                message: 'password is not match'
            })
        }
        const userExist = await User.findOne({ username: username })
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: " User is pre exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        if (gender === 'male') {
            profilePicture = `https://avatar.iran.liara.run/public/boy`
        }
        if (gender === 'female') {
            profilePicture = `https://avatar.iran.liara.run/public/girl`
        }
        const user = await User.create({
            username,
            password: hashPassword,
            profilePicture,
            gender
        });
        return res.status(201).json({
            success: true,
            message: 'User register successfully'
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'some backend error in the register function'
        })
    }
}
/// login
export const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'fill all data in register form'
            })
        }

        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: " User is not exist"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "username or password is not match"
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await JWT.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            success: true,
            message: "login successfully",
            user,
            userId: user._id,
            username: user.username,
            profilePicture: user.profilePicture,

        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'some backend error in the register function',

        })
    }
}
////logout
export const userLogout = async (req, res) => {
    try {
        return res.status(201).cookie("token", '', { maxAge: 1000, httpOnly: true, sameSite: "strict" }).json({
            success: true,
            message: "successfully logout"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'backend error in the logout function'
        })
    }
}
////get other user
export const getOtherUsers = async (req, res) => {
    try {
        const userId = req.id;
        const otherUser = await User.find({ _id: { $ne: userId } }).select("-password");
        return res.status(200).json({
            success: true,
            otherUser
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "backend error in the getUserFunction"
        })
    }

}
// ==================== UPDATE PROFILE PICTURE ====================
export const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload an image" });
    }

    // req.file.path is automatically the Cloudinary URL because of our setup!
    const updatedUser = await User.findByIdAndUpdate(
      req.id, 
      { profilePicture: req.file.path }, 
      { new: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile picture updated",
      user: updatedUser
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({ success: false, message: "Failed to update profile picture" });
  }
};