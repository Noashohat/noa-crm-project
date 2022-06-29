const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

const { CustomerModel, validatecustomer } = require("../models/customers");

router.post("/addcustomer", async (req, res) => {
  const { error, value } = validatecustomer(req.body);

  if (error) {
    res.status(404).json(`error adding customer: ${error}`);
    return;
  }

  try {
    const { name, email, password, customerType } = req.body;

    const customer = await CustomerModel.create({
      name,
      email,
      password,
      customerType,
    });

    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);
    await customer.save();
  } catch (err) {
    console.log(err);
    res.status(400).send(`error adding customer: ${err}`);
    return;
  }

  res
    .status(200)
    .json(
      `${value.name} added succesfully > details: name:${value.name},email:${value.email},password:${value.password},customerType:${value.customerType}`
    );
});

/////////////////////

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

  const token = jwt.sign({ _id: user.id }, config.JWT_SECRET, {
    expiresIn: "72800s",
  });
  res
    .header("auth-token", token)
    .send(`welcome ${req.body.email} , here is your token: ${token}`);
});

module.exports = router;
