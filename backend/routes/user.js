const router = require("express").Router();
const User = require("../models/user");
const bcrpypt = require("bcryptjs");
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
      const hashPass = await bcrpypt.hash(password, 10); // Hash the password

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
       res.status(400).json({ message: "Invalid credentials" });
    }
await bcrpypt.compare(password, existingUser.password).then((match) => {
      if (!match) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        return res.status(200).json({ message: "Login Successfully" });
      }
    });

    
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    
  }

});

module.exports = router;