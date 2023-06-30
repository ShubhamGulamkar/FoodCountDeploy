const HttpError = require("../models/http-error");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { empid, ename, email, password, mobile } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await User.findOne({ email: email });
    console.log(existingAdmin);
  } catch (err) {
    const error = new HttpError("signup failed , try again", 500);
    return next(error);
  }
  if (existingAdmin) {
    const error = new HttpError("Account already registered", 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  const newUser = new User({
    empid: empid,
    ename: ename,
    email: email,
    password: hashedPassword,
    mobile: mobile,
  });

  try {
    console.log("Signup successfully");
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Signup  failed ", 500);
    return next(error);
  }

  res.status(201).json({ User: newUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let identifiedAdmin;
  try {
    identifiedAdmin = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError("login failed , try again", 500);
    return next(error);
  }

  if (!identifiedAdmin) {
    return next(new HttpError("Wrong creditial", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedAdmin.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials",
      500
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Wrong creditial", 401));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedAdmin.empid, emailId: identifiedAdmin.email },
      "FRSSSVPR",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }
  // res.json({Message: 'logged in'})

  res.status(201).json({ User: identifiedAdmin, token: token });
};

exports.login = login;
exports.signup = signup;
