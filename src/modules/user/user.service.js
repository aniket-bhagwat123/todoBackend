import User from "./user.model.js";

// GET ALL USERS WITH FILTERING AND PAGINATION
export const getUsers = async (req, res) => {
  try {
    const { email, name, page, limit, isActive } = req.query || {};
    const filter = {
      isDeleted: { $ne: true },
    };

    if (email) {
      filter.email = email;
    };

    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

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

// UPDATE USER INFO
export const updateUser = async (data_) => {
  const { email, name, password, user_id, isActive } = data_;

  if(!user_id) {
    throw new Error("User ID is required for update");
  }

  if (!email && !name && !password && isActive === undefined) {
    throw new Error("At least one field (name, email, password, or isActive) must be provided for update");
  }

  const existingUser = await getUserById(user_id);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const userUpdateData = {};

  if (name !== undefined) userUpdateData.name = name;
  if (email !== undefined) userUpdateData.email = email;
  if (password !== undefined) userUpdateData.password = password;
  if (isActive !== undefined) userUpdateData.isActive = isActive;

  const updatedUser = await User.findByIdAndUpdate(
    user_id,
    userUpdateData,
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