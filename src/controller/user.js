import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const REGISTER = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      email: req.body.email,
      password: hash,
      name: req.body.name,
      id: uuidv4(),
    };
    const findUserEmail = await UserModel.findOne({ email: newUser.email });
    if (findUserEmail) {
      return res
        .status(403)
        .json({ message: "User with such email already exists!" });
    }
    const user = new UserModel(newUser);
    const response = user.save();

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const userAdded = await response;
    return res.status(200).json({
      message: "User added successfully!",
      user: userAdded,
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(403).json({ message: "Bad input data!" });
    }
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!checkPassword) {
      return res.status(403).json({ message: "Bad input data!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "Login successful!", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};
export { REGISTER, LOGIN };
