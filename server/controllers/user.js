import User from "../models/user.js"
import { generateToken } from "../helper/token.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "please fill all the given fields"
            });

            return;
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                success: false,
                message: "user already exist"
            });

            return;
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "signedUp successfully",
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while signUp",
        })
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "please fill all the given fields"
            });

            return;
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(400).json({
                success: false,
                message: "invalid email or password"
            });

            return;
        }

        const matchPassword = await userExist.comparePassword(password);
        if (!matchPassword) {
            res.status(400).json({
                success: false,
                message: "invalid email or password"
            });

            return;
        }

        const token = generateToken(userExist._id);

        res.status(200).json({
            success: true,
            message: "signIn successfully",
            user: userExist,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while signIn",
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {


        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Getting all users successfully",
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while Getting all users",
        })
    }
}

export const getUser = async (req, res) => {
    try {


        const user = await User.findById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Getting user successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while Getting user",
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({
                success: false,
                message: "please fill all the given fields"
            });

            return;
        }

        const users = await User.findByIdAndUpdate(req.params.id, { name, email });

        res.status(200).json({
            success: true,
            message: "Updating user successfully",
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while Updating user",
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Deleting user successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error occur while Deleting user",
        })
    }
}