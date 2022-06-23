const Joi = require("joi");

const mongoose = require("mongoose");

const cardschema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  businessDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  businessAddress: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400,
  },
  businessPhone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 15,
  },
  businessPic: {
    type: String,
    minlength: 11,
    maxlength: 1024,
  },
  customer_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
});

const CardModel = mongoose.model("Card", cardschema);

const JoiSchema = Joi.object({
  businessName: Joi.string().min(2).max(255).required(),
  businessDescription: Joi.string().min(2).max(1024).required(),
  businessAddress: Joi.string().min(2).max(400).required(),
  businessPhone: Joi.string().min(9).max(15).required(),
  businessPic: Joi.string().min(11).max(1024),
  customer_id: Joi.string().required(),
});

const validateCard = (card) => JoiSchema.validate(card);

// module.exports = validateTodo;

// module.exports = TodoModel;

exports.CardModel = CardModel;
exports.validateCard = validateCard;
