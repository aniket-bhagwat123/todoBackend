import User from "./user.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  const { email, password, name } = userData;
  
  if (!email || !password || !name) {
    throw new Error("Name, email, and password are required");
  };

  const existingUser = await getUserByEmail(email);
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

export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
}