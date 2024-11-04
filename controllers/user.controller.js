const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.models");


const registerUser = asyncHandler (async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email || password)) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const userExisted = await User.findOne({ email });
    if ( userExisted) {
        res.status(400);
        throw new Error("User with the email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashed password: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("User data invalid");
    };

    res.json({ message: "User registered successfully"});
});

const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are mandatory")
    }

    const user = await User.findOne({ email });

    if (user && ( await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m" }
        )
        console.log(accessToken)
        res.status(200).json({
            accessToken
        });
    } else {
        res.status(401);
        throw new Error(" email or password didn't matched")
    }

});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, userLogin, currentUser };