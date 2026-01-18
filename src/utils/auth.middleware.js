import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";

// AUTHENTICATION MIDDLEWARE
export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user || user.isDeleted) {
            return res.status(401).json({ error: "User not found or has been deleted" });
        }
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};