import { createUser, getUserByEmail } from "./user.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to register user" });
  }
};

export const fetchUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};