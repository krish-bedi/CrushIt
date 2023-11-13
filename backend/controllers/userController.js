import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import sendVerificationEmail from '../utils/sendVerificationEmail.js';
import express from 'express';
import * as Joi from '@hapi/joi';
import sendResetEmail from '../utils/sendResetMail.js';
import jwt from 'jsonwebtoken';
import { provider } from '@hapi/joi/lib/cache.js';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async(req, res) => {
    //To throw an error
    //
    //res.status(401);
    //throw new Error('Something went wrong');
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            first: user.first,
            last: user.last,
            email: user.email,
            pomodoro: user.pomodoro,
            short: user.short,
            long: user.long
        },
        { message: 'Successfully authenticated the user' });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user and verify using JWT token
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    let confirmed = false
    const user = await User.create({
        email,
        password,
        confirmed
    });
    if(user) {
        generateToken(res, user._id);
        await sendVerificationEmail(user);
        console.log("after verify")
        res.status(201).json({
            _id: user._id,
            first: user.first,
            last: user.last,
            email: user.email,
            pomodoro: user.pomodoro,
            short: user.pomodoro,
            long: user.long,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Confirm the token
const confirmToken = asyncHandler(async (req, res) => {
    try {
        console.log("here for confirmation", req.params.token)
        const { user: { id } } = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const userConfirm = await User.findById(req.params.userId);
        if (!userConfirm) return res.status(400).send("invalid link or expired");
        console.log("now updating")
        userConfirm.confirmed = true;
        await userConfirm.save();
        res.status(200).json({ message: 'User verified successfully' });
    } catch (e) {
        res.status(404);
        throw new Error('Token not verified');
    }
})
// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
})

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = {
        _id: req.user._id,
        first: req.user.first,
        last: req.user.last,
        email: req.user.email,
        pomodoro: req.user.pomodoro,
        short: req.user.short,
        long: req.user.long,
    }
    res.status(200).json(user);
})

// @desc    C
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.first = req.body.first || user.first;
        user.last = req.body.last || user.last;
        user.email = req.body.email || user.email;
        user.pomodoro = req.body.pomodoro || user.pomodoro;
        user.short = req.body.short || user.short;
        user.long = req.body.long || user.long;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            first: updatedUser.first,
            last: updatedUser.last,
            email: updatedUser.email,
            pomodoro: updatedUser.pomodoro,
            short: updatedUser.short,
            long: updatedUser.long,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const checkPassword = asyncHandler(async(req, res) => {
    const { _id ,currentPassword } = req.body;

    const user = await User.findOneById({_id});

    if(user && (await user.matchPassword(currentPassword))) {
        res.status(200).json({ message: 'Current password is correct' });
    } else {
        res.status(401);
        throw new Error('Current password is incorrect');
    }
});


// @desc    resetPassword using JWT 
// route    POST /api/users/resetPassword
// @access  Private
const resetPassword = asyncHandler(async(req, res) => {
    try {
        const email = req.body.email
        const userExists = await User.findOne({email});
        if (userExists) {
            await sendResetEmail(userExists)
            res.status(200).json({ message: 'Sent the reset password link' });
        }
        else {
            res.status(400);
            throw new Error('User does not exist');
        }
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
})

const resetPasswordConfirmation = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        user.password = req.body.password;
        await user.save();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
})


// @desc    uploadImage 
// route    POST /api/users/uploadImage
// @access  Private

const uploadImage = asyncHandler(upload.single('image'), async (req, res) => {
    try {
        console.log("hereee")
        const userId = req.params.email;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        user.profileImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
    
        await user.save();
        res.status(200).send('Image uploaded successfully!');
      } catch (error) {
        res.status(500).send(error.message);
      }
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkPassword,
    resetPassword,
    confirmToken,
    resetPasswordConfirmation,
    uploadImage
};