const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { CustomerModel, validatecustomer } = require("../models/customers");
const { CardModel } = require("../models/cards");

////////////////////////
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      success: false,
      data: [],
      message: "It is not a valid mongodb id",
    });

  const customer = await CustomerModel.findById(req.params.id);

  if (!customer)
    return res.status(404).json(
      res.json({
        success: false,
        data: [],
        message: "There is no data found related to this id!",
      })
    );

  return res.json({
    success: true,
    data: customer,
    message: "Finding successful!",
  });
});

module.exports = router;
