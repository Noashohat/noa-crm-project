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

  // search using id In mongodb with mongoose
  const customer = await CustomerModel.findById(req.params.id);

  // checking if todo not found then 404 request
  if (!customer)
    return res.status(404).json(
      res.json({
        success: false,
        data: [],
        message: "There is no data found related to this id!",
      })
    );

  // if found then send the response
  return res.json({
    success: true,
    data: customer,
    message: "Finding successful!",
  });
});

////////////////////////

// router.get("/cards/:id", async (req, res) => {
//   const { error } = validateCards(req.params.id);
//   if (error) res.status(400).send(error.details[0].message);

//   const getCards = async (cardsArray) => {
//     const cards = await CardModel.find({ ObjectId: { $in: cardsArray } });
//     return cards;
//   };

//   let user = await CustomerModel.findById(req.user._id);
//   user.cards = req.body.cards;
//   user = await user.save();
//   res.send(user);
// });

module.exports = router;
