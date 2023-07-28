const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { err, hashPassword } = require("../utils/util");

// model
const User = require("../models/User");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

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

    // query permissions
    const permissions = [];
    for(const r of user.roles) {
      const role = await Role.findById(r);
      for(const p of role.permissions) {
        const permission = await Permission.findById(p);
        if (permission) {
          permissions.push(permission.name);
        }
      }
    }

    // create token
    const jwtkey = process.env.JWT_KEY;
    const token = jwt.sign(
      {_user: {id: user._id,permissions}},
      jwtkey,
      {expiresIn: "1d"}
    );
    return res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      permissions
    });
  } catch(error) {
    return next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {

    // create and save
    const created = new User({
      name: req.body.name,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      roles: []
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;