import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../../utils/generateJwtToken.js";

// LOGIN AUTHENTICATION
export const LoginAuth = async (email, password) => {
  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) {
    throw new Error("Invalid email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Password is incorrect");
  }

  const accessToken = generateJwtToken({ userId: user._id, email: user.email });

  return { user, accessToken};
};

// CREATE NEW USER
export const createUser = async (userData) => {
  const { email, password, name } = userData;
  
  if (!email || !password || !name) {
    throw new Error("Name, email, and password are required");
  };

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  };

  const SALT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}