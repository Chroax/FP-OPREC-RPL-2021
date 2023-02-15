const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const registerUser = async (req, res) => {
  const inputPassword = req.body.password;
  const phoneNumber = req.body.phone;

  if (!inputPassword) {
    res.status(401).json("Password is empty");
    return;
  }
  if (
    !validator.isStrongPassword(inputPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
  ) {
    res
      .status(401)
      .json(
        "Password is not strong (min 8 character, 1 uppercase, 1 lowercase, 1 number, and 1 special character)"
      );
    return;
  }

  if (!phoneNumber) {
    res.status(401).json("Phone is empty");
    return;
  }
  if (phoneNumber.length < 12 || phoneNumber.length > 12) {
    res.status(401).json("Phone number is not valid");
    return;
  }

  const newUser = new User({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    phone: req.body.phone,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(401).json("Wrong User Name");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      res.status(401).json("Wrong Password");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { registerUser, loginUser };
