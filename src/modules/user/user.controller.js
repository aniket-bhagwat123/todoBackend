import { getUserById, getUsers, updateUser, softDelete } from "./user.service.js";

// GET USER LIST WITH FILTERING AND PAGINATION
export const getUserList = async (req, res) => {
  try {
    const users = await getUsers(req, res);

    if (users?.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No users found",
        data: {
          users: [],
          pagination: { 
            page: req.query.page || 1, 
            limit: req.query.limit,
            records: 0,
          }
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: {
        users: users,
        pagination: { 
          page: req.query.page || 1, 
          limit: req.query.limit,
          records: users.length,
        }
      }, 
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const updateData = req.body;
    const updatedUser = await updateUser(updateData);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }
  catch (error) {
    res.status(400).json({ error: error.message || "Failed to update user" });
  }
};

// FETCH USER BY ID
export const fetchUserById = async (req, res) => {
  try {
      const _id = req.params.id;
      const user = await getUserById(_id);
      if (user) {
          res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
          });
      } else {
          res.status(404).json({
            success: false,
            message: "User not found",
            data: {},
          });
      }
  } catch (error) {
      res.status(500).json({ error: error.message || "Failed to fetch user" });
  }
};

// SOFT DELETE USER
export const softDeleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await softDelete(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  }
  catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
};