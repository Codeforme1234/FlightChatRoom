const jwt = require("jsonwebtoken");
const users = require("../models/User");

// Register
const register = async (req, res) => {

  try {
    const { nickname, password, phoneNumber, email } = req.body;

    const existingUser = await users.findOne({
      $or:[
        {nickname: nickname},
        {email: email},
      ]
    });

    if( existingUser){
      if(existingUser.nickname === nickname){
        return res.status(400).json( {message: "Nickname already exists"});
      }
      if(existingUser.email === email){
        return res.status(400).json( {message: "Email already exists"});
      }
    }

    const user = new users({
      nickname, 
      password,
      phoneNumber,
      email
    });
    await user.save();
    return res.status(201).json({message: "User created successfully"});
} catch (error){
  return res.status(500).json({message: "Error creating user"});
}
};

// Login
const login = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    const user = await users.findOne({ nickname, password }); 
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ nickname }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
