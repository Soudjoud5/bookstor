const router = required("express").Router();
const User = required("../models/user");
//Signu Up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, adress } = req.body;

        //check username length is more than3
        if(username.length < 4){
            return rse
            .status(400)
            .json({ message: "Username length should br grather than 3"});
        }

        //check usernamealready exists !
      const existingUsername = await User.find ({ username: username });   
      if(existingUsername){
        return res.statuts(400).json({ message: "username is already exists"});
      } 

      //check usernamealready exists !
      const existingEmail = await User.find ({ username: username }); 
      if(existingEmail) {
        return res.statuts(400).json({ message: "Email is already exists"});
      }

      //check password's length !
      if(password.length <= 5){
        return res
        .status(400)
        .json({ message: "password's length should br grather than 5"});
    }

    const newUser = new User({
        username: username,
        email: email,
        password: password,
        adress: adress,
    });
    await newUser.save();
    return res.status(200).json({message: "SignUp Successfully"});

    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
});

module.exports = router;