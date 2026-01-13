import User from "./user.model.js";
import bcrypt from "bcryptjs";

// GET ALL USERS WITH FILTERING AND PAGINATION
export const getUsers = async (req, res) => {
  try {
    const { email, name, page, limit } = req.query || {};
    const filter = {
      isDeleted: { $ne: true },
    };

    if (email) {
      filter.email = email;
    };

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    };

    if(page && limit) {
      const pageNumber = parseInt(page, 10) || 1;
      const limitNumber = parseInt(limit, 10) || 10;
      const skip = (pageNumber - 1) * limitNumber;

      const users = await User.find(filter).skip(skip).limit(limitNumber);
      return users
    };

    const users = await User.find(filter);
    return users;
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  } 
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

// UPDATE USER INFO
export const updateUser = async (data_) => {
  const { email, name, password, user_id } = data_;

  if(!user_id) {
    throw new Error("User ID is required for update");
  }

  if (!email && !name && !password) {
    throw new Error("At least one field (name, email, or password) must be provided for update");
  }

  const existingUser = await getUserById(user_id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    { name, email, password },
    { new: true }
  );

  return updatedUser;
}

// GET USER BY ID
export const getUserById = async (_id) => {
  return await User.findOne({ _id });
}

// DELETE USER (SOFT DELETE)
export const softDelete = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found");
  };

  user.isDeleted = true;
  user.email = `deleted_${Date.now()}@example.com`;

  await user.save();
  return user;
}