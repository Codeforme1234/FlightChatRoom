const jwt = require("jsonwebtoken");

const MOCK_JWT_SECRET = 'djgfdfhkjdfkdhkfjdljfljdlfjsljfldjfldjlfkj'; 

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, MOCK_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
