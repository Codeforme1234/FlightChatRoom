const jwt = require("jsonwebtoken");

const users = []; 

// Register
const register = (req, res) => {
  const { nickname, password } = req.body;

  if (users.some((user) => user.nickname === nickname)) {
    return res.status(400).json({ message: "Nickname already taken" });
  }

  users.push({ nickname, password });
  return res.status(201).json({ message: "User registered successfully" });
};

// Login
const login = (req, res) => {
  const { nickname, password } = req.body;

  const user = users.find((user) => user.nickname === nickname && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ nickname }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return res.status(200).json({ message: "Login successful", token });
};

module.exports = { register, login };
