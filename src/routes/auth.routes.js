const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { err } = require("../utils/util");

// model
const User = require("../models/User");

router.post("/login", async (req, res, next) => {
  try {

    // get user
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      err(401, "Wrong email or password");
    }

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      err(401, "Wrong email or password");
    }

    // create token
    const jwtkey = process.env.JWT_KEY;
    const token = jwt.sign({ user_id: user._id }, jwtkey);
    return res.status(200).json({ token, name: user.name });
  } catch(error) {
    return next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // create and save
    const created = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      roles: []
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;