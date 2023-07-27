const express = require("express");
const router = express.Router();

// model
const Role = require("../models/Role");

// routes
router.get("/", async (req, res, next) => {
  try {
    const all = await Role.find();
    return res.status(200).json(all);
  } catch(error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const single = await Role.findById(req.params.id);
    return res.status(200).json(single);
  } catch(error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const created = new Role({
      name: req.body.name,
      permissions: req.body.permissions,
    });
    const record = await created.save();
    return res.status(200).json(record);
  } catch(error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Role.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
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
  try {
    const deleted = await Role.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleted);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;