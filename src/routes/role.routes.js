const express = require("express");
const router = express.Router();

// model
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const seed = require("../seed/roles");

// routes
router.post("/seed", async(red, res, next) => {
  try {
    await Role.deleteMany({});

    // build data
    let data = [];
    for(const s of seed) {
      let permissions = [];
      for(const p of s.permissions) {
        const permission = await Permission.findOne({ "name": p });
        if (permission) {
          permissions.push(permission._id);
        }
      }
      data.push({
        "name": s.name,
        "description": s.description,
        "permissions": permissions
      });
    }

    await Role.insertMany(data);
    return res.status(200).json({
      message: "Roles with permissions seeded successfully"
    });
  } catch(error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view roles")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const all = await Role.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view roles")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const single = await Role.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can add roles")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const created = new Role({
      name: req.body.name,
      description: req.body.description,
      permissions: req.body.permissions,
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can edit roles")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        permissions: req.body.permissions,
      },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch(error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can delete roles")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;