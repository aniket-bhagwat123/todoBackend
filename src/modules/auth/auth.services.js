import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const LoginAuth = async (email, password) => {
  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) {
    throw new Error("Invalid email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  const accessToken = Jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, accessToken};
};