const User = require('../models/user');

const createUser = async (req, res) => {
  try {

    // retrieve user email / passoword from request body
    const { email, password } = req.body;
    
    // assign user details to user variable
    const user = new User({
      email,
      password,
    });
    console.log("BE - user details received")

    // save user details 
    const savedUser = await user.save()

    res.status(201).json({
      message: "User created successfully",
      userID: savedUser._id,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res
      .status(400)
      .json({ message: "User Validation Failed", errors: error.errors });
      console.log("Validation error in creating user");
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      console.log("Email already in use, choose new email.");
      res.status(409).json({ mesaage: "Email already in use", errors: error.errors })
    } else {
      console.error("Error creating user: ", error);
      res.status(500).json({ message: "Internal server error" });
      console.log("Error in creating user");
    }
  };
};

const getUser = async (req, res) => {
  try {
    const token = generateToken(req.params.id);
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      console.log(req.params.id);
      console.log("Auth Error: User not found");
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const UsersController = {
  createUser: createUser,
  getUser: getUser,
}

module.exports = UsersController;