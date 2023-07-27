const express = require("express");
const router = express.Router();

// model
const Permission = require("../models/Permission");
const seed = require('../seed/permissions');

// routes
router.post("/seed", async(req, res, next) => {
  try {
    await Permission.deleteMany({});
    await Permission.insertMany(seed);
    return res.status(200).json({
      message: "Permissions seeded successfully"
    });
  } catch(error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view permissions")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const all = await Permission.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view permissions")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const single = await Permission.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

/*
router.post("/", async (req, res, next) => {
  try {
    const created = new Permission({
      name: req.body.name
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Permission.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch(error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Permission.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});
*/

module.exports = router;