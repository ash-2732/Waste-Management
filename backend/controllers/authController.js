import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtils.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    //validate
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "PLEASE FILL IN ALL FIELDS",
      });
    }
    //check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: "USER ALREADY EXISTS WITH THIS EMAIL",
      });
    }

    //create user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: "USER CREATED SUCCESSFULLY",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR IN REGISTER CONTROLLER",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "INVALID EMAIL OR PASSWORD",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USER NOT FOUND",
      });
    }
    const matchedUser = await comparePassword(password, user.password);
    if (!matchedUser) {
      return res.status(404).send({
        success: false,
        message: "INVALID PASSWORD",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.status(200).send({
      success: true,
      message: "LOGIN SUCCESSFULLY",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role, // this is the role of the user
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR IN LOGIN CONTROLLER",
      error,
    });
  }
};

// test controller
const testController = (req, res) => {
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(error);
    res.send({
      error,
    });
  }
};

//update profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const user = await userModel.findById(req.user._id);
    if (password && password.length < 4) {
      return res.json({
        message: "PASSWORD MUST BE AT LEAST 4 CHARACTERS",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "PROFILE UPDATED SUCCESSFULLY",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "ERROR IN UPDATING PROFILE",
      error,
    });
  }
};

export {
  registerController,
  loginController,
  testController,
  updateProfileController,
};
