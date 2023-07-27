const express = require("express");
const router = express.Router();

// model
const Category = require("../models/Category");
const Acronym = require("../models/Acronym");
const seed = require("../seed/acronyms");

// routes
router.post("/seed", async(red, res, next) => {
  try {
    await Acronym.deleteMany({});

    // build data
    let data = [];
    for(const s of seed) {
      let categories = [];
      for(const p of s.categories) {
        const category = await Category.findOne({ "name": p });
        if (category) {
          categories.push(category._id);
        }
      }
      data.push({
        "acronym": s.acronym,
        "definitions": s.definitions,
        "status": s.status,
        "categories": categories
      });
    }

    await Acronym.insertMany(data);
    return res.status(200).json({
      message: "Acronyms with categories seeded successfully"
    });
  } catch(error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view acronyms")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const all = await Acronym.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can view acronyms")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const single = await Acronym.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  if(!req._user.permissions.includes("Can add acronyms")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const created = new Acronym({
      acronym: req.body.acronym,
      definitions: req.body.definitions,
      status: req.body.status,
      categories: req.body.categories
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can edit acronyms")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const updated = await Acronym.findByIdAndUpdate(
      req.params.id,
      {
        acronym: req.body.acronym,
        definitions: req.body.definitions,
        status: req.body.status,
        categories: req.body.categories
      },
      { new: true }
    );
    return res.status(200).json(updated);
  } catch(error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  if(!req._user.permissions.includes("Can delete acronyms")) {
    return res.status(403).json("You are not authorized to access this resource");
  }

  try {
    const deleted = await Acronym.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;