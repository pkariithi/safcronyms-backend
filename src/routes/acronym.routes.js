const express = require("express");
const router = express.Router();

// model
const Acronym = require("../models/Acronym");

// routes
router.get("/", async (req, res, next) => {
  try {
    const all = await Acronym.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const single = await Acronym.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
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
  try {
    const deleted = await Acronym.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;