import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const signUp = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            verificationToken
        });

        await newUser.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await sendEmail(
            email,
            "Verify your account",
            `<p>Click here to verify your account: <a href="${verifyUrl}">${verifyUrl}</a></p>`
        );

        res.json({ message: "User registered. Please check your email for verification." });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }

    return req.status(200).json({ status: "success", message: "successfully register !" })
}

export const verify = async(req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: "Email verified successfully. You can now log in." });
    } catch (err) {
        res.status(500).json({ message: "Error verifying email" });
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: "1h" }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ message: "Error logging in" });
    }
}