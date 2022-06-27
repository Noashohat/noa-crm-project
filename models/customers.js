const Joi = require("joi");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const { string } = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  customerType: {
    type: String,
    enum: ["business", "individual"],
    required: true,
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

const CustomerModel = mongoose.model("Customer", customerSchema);

const JoiSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  customerType: Joi.string().required().valid("business", "individual"),
});

const validatecustomer = (customer) => JoiSchema.validate(customer);

function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });
}

exports.CustomerModel = CustomerModel;
exports.validatecustomer = validatecustomer;
exports.validateCards = validateCards;
