import { LoginAuth, createUser } from "./auth.services.js";

// LOGIN USER
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const LoginData = await LoginAuth(email, password);

    if (!LoginData) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",  
      data: {
        user: LoginData.user,
        token: LoginData.accessToken
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Login failed" });
  }
};

// REGISTER NEW USER
export const registerUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Failed to register user" });
  }
};