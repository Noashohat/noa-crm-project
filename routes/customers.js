const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { CustomerModel, validatecustomer } = require("../models/customers");
const { CardModel } = require("../models/cards");

// // insert a new data in todo
router.post("/addcustomer", async (req, res) => {
  // validate using Joi, with factoring function
  const { error, value } = validatecustomer(req.body);

  // if have any error then return bad request with error else just add the new one
  if (error) {
    res.status(404).json(`error adding customer: ${error}`);
    return;
  }

  try {
    const database = await mongo.getDb();
    const collection = database.collection("customers");
    collection.insertOne(value); // { name: '', phone..., email}
  } catch (err) {
    console.log(err);
    res.status(400).send(`error adding customer`);
    return;
  }

  customer = new CustomerModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    customerType: req.body.customerType,
  });

  const salt = await bcrypt.genSalt(10);
  customer.password = await bcrypt.hash(customer.password, salt);
  await customer.save();
  res
    .status(200)
    .json(
      `${value.name} added succesfully > details: name:${value.name},email:${value.email},password:${value.password},customerType:${value.customerType}`
    );
});

///////////////////////
/////////////////////
////////////////////

router.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  const { error, value } = schema.validate(req.Body);
  if (error) {
    console.log(error.details[0].message);
    res.status(401).send("Unauthorized");
    return;
  }
  const user = await CustomerModel.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("invalid email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("invalid email or password");

  res.send("welcome");
});

//////////////////////////////
////////////////////////////
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
