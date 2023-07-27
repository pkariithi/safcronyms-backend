const express = require("express");
const router = express.Router();

// model
const Category = require("../models/Category");
const seed = require("../seed/categories");

// routes
router.post("/seed", async(red, res, next) => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(seed);
    return res.status(200).json({
      message: "Categories seeded successfully"
    });
  } catch(error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view categories")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const all = await Category.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view categories")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const single = await Category.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can add categories")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const created = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can edit categories")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch(error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can delete categories")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;