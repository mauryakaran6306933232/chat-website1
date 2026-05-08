
import JWT from 'jsonwebtoken';

export const isAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

    req.id = decoded.userId; // attach user ID to request
    next();
  } catch (error) {
    console.error("isAuthenticate error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
