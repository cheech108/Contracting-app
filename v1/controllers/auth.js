import User from "../models/User.js";

export async function Register(req, res) {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
        });
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        const savedUser = await newUser.save();
        const { role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message:
                "Thank you for registering with us. Your account has been successfully created.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [err.message],
            message: "Internal Server Error",
        });
    }
    res.end();
}
export async function Login(req, res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });
        const isPasswordValid = req.body.password === user.password
        if (!isPasswordValid)
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentials.",
            });
        // return user info except password
        const { password, ...user_data } = user._doc;

        let options = {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        };
        const token = user.generateAccessJWT();
        res.cookie("SessionID", token, options);
        res.status(200).json({
            status: "success",
            data: [user_data],
            token: token,
            message: "You have successfully logged in.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [err.message],
            message: "Internal Server Error",
        });
    }
    res.end();
}