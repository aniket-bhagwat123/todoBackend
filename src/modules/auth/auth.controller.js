import { LoginAuth } from "./auth.services.js";

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