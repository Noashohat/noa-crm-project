const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

const { CustomerModel, validatecustomer } = require("../models/customers");

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

  // res.status(200).json(`${value.name} added successfully`);
});

// Get the data about a single todo
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

module.exports = router;
