const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * 
 * TESTING USER CONTROLLER
 * 
 */
const testUser = async (req, res) => {
  res.status(200).json({success: true, msg: "Lokendra User route is working"});
};

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * 
 * REGISTER NEW USER
 * 
 */
const registerUser = async (req, res) => {
  
  const { name, email, password, phoneNumber } = req.body;
  console.log("============backend in Register User=======");
  console.log("Name: " + name + "Email: " + email + "Password: " + password+ "Phone Number: " + phoneNumber) ;



  //checking if the fields are empty
  if(!name || !email || !password || !phoneNumber) {
    return res.status(400).json({success: false, msg: "Lokendra All the fields are required"});
  }

  //checking if the user already exists
  const userExists = await User.findOne({email});
  if(userExists) {
    return res.status(401).json({success: false, msg: "Lokendra User already exists"});
  }

  //create and add user
  const user = await User.create({
    name,
    email,
    password,
    phoneNumber
  });

  if(user) {
    /**
     * status 201 means
     * request has been successfully processed and new 
     * resource has been created
     */
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(402).json({success: false, msg: "Lokendra Invalid user data"});
  } 
};

  /**
   * 
   * LOGIN USER
   * 
   */
  const loginUser = async (req, res) => {
    const {email, password} = req.body;
  console.log("============backend in Login User=============");
  console.log( "Email: " + email + "Password: " + password) ;

    //checking if user is exists in database
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({success: false, msg: "Lokendra Invalid email or password"});
    }
  };

  /**
   * 
   * HOME route (protected)
   * 
   */
  const home = async (req, res) => {
    res.status(200).json({success: true, msg: `Welcome Home ${req.user.name}`});
  };

  module.exports = { registerUser, loginUser, home, testUser };

