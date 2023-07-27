const express = require("express");
const router = express.Router();

// model
const Role = require("../models/Role");
const User = require("../models/User");
const seed = require("../seed/users");
const { hashPassword } = require("../utils/util");

// routes
router.post("/seed", async(red, res, next) => {
  try {
    await User.deleteMany({});

    // build data
    let data = [];
    for(const s of seed) {
      let roles = [];
      for(const r of s.roles) {
        const role = await Role.findOne({ "name": r });
        if (role) {
          roles.push(role._id);
        }
      }
      data.push({
        "name": s.name,
        "email": s.email,
        "password": await hashPassword(s.password),
        "roles": roles
      });
    }

    await User.insertMany(data);
    return res.status(200).json({
      message: "Users with roles seeded successfully"
    });
  } catch(error) {
    return next(error);
  }
});
router.get("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view users")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const all = await User.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view users")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const single = await User.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can edit users")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        roles: req.body.roles,
      },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch(error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can delete users")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;