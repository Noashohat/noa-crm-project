const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();

const { CardModel, validateCard } = require("../models/cards");
const { CustomerModel } = require("../models/customers");
const { ObjectId } = require("mongodb");

///////////
router.post("/addcard", async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details.message);

  try {
    const {
      customer_id,
      businessName,
      businessDescription,
      businessAddress,
      businessPhone,
      businessPic,
    } = req.body;
    const newcard = await CardModel.create({
      customer_id,
      businessName,
      businessDescription,
      businessAddress,
      businessPhone,
      businessPic,
    });

    const card = await newcard.save();

    return res.send(card);
  } catch (err) {
    console.log(err);
    res.status(400).send(`error adding Card:${err}`);
    return;
  }
});

//////////////////////////////
////////////////////////////
//////////////////////////////
router.get("/details/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      success: false,
      data: [],
      message: "It is not a valid mongodb id",
    });

  const card = await CardModel.findById(req.params.id);

  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  return res.status(200).json(card);
});

///////////////////
///////////////////////
/////

router.delete("/deletecard/:id", async (req, res) => {
  // find an delete the data using moongoose & mongodb
  const deletedcard = await CardModel.findByIdAndRemove(req.params.id);

  // checking if todo not found then 404 request & if found then send the response
  if (!deletedcard)
    return res.status(404).json({
      success: false,
      data: [],
      message: "There is no data found related to this id!",
    });

  // finally response send with deleted data

  return res
    .status(200)
    .json(
      `${deletedcard.businessName} added succesfully > details: businessName:${deletedcard.businessName},businessDescription:${deletedcard.businessDescription},businessAddress:${deletedcard.businessAddress},businessPhone:${deletedcard.businessPhone},businessPic:${deletedcard.businessPic}, customer_id:${deletedcard.customer_id}`
    );
});
/////////////////////////////
///////////
/////////////////////
router.put("/updatecard/:id", async (req, res) => {
  const { error, value } = validateCard(req.body);

  if (error) {
    res.status(404).json(`error updating card: ${error}`);
    return;
  }

  const card = await CardModel.updateOne(
    { _id: ObjectId(req.params.id) },
    {
      $set: {
        customer_id: req.customer_id,
        businessName: req.body.businessName,
        businessDescription: req.body.businessDescription,
        businessAddress: req.body.businessAddress,
        businessPhone: req.body.businessPhone,
        businessPic: req.body.businessPic,
      },
    }
  );

  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  const newcard = await CardModel.findOne({
    _id: req.params.id,
  });
  res.status(200).send(newcard);
});

///////////////////////////////////////////
////////////////////////////////////
///////////////////////
router.get("/cards/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      success: false,
      data: [],
      message: "It is not a valid mongodb id",
    });
  try {
    const userId = req.params.id;
    const cards = await CardModel.find({ customer_id: ObjectId(userId) });

    res.status(200).json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong, check logs");
  }
});

module.exports = router;
