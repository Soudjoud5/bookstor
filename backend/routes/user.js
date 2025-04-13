const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth");
//Signu Up
router.post("/sign-up", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      if (username.length < 4) {
          return res.status(400).json({ message: "Username length should be greater than 3" });
      }

      const existingUsername = await User.findOne({ username: username });
      if (existingUsername) {
          return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await User.findOne({ email: email });
      if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
      }

      if (password.length <= 5) {
          return res.status(400).json({ message: "Password length should be greater than 5" });
      }
      const hashPass = await bcrypt.hash(password, 10); // Hash the password

      const newUser = new User({
          username,
          email,
          password: hashPass,
      });

      await newUser.save();
      return res.status(200).json({ message: "SignUp Successfully" });

  } catch (error) {
      console.error("Signup Error:", error); // <--- ADD this
      res.status(500).json({ message: "Internal server error" });
  }
});

// sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      const authClaims = [
        { name: existingUser.username },
        { role: existingUser.role },
      ];

      const token = jwt.sign({ authClaims }, "bookstor123", { expiresIn: "30d" });

      return res.status(200).json({
        id: existingUser._id,
        role: existingUser.role,
        token: token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get User information

router.get("/get-user-information", authenticateToken,async (req, res) => {
  try{
    const {id} = req.headers;
    const data =await User.findById(id).select("-password");
    return res.status(200).json(data);
  }catch(error){
   res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;