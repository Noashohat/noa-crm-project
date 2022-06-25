const express = require("express");
const mongo = require("../models/database");
const mongoose = require("mongoose");
const router = express.Router();

const { CardModel, validateCard } = require("../models/cards");

///////////
router.post("/addcard", async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details.message);

  let card = new CardModel({
    businessName: req.body.businessName,
    businessDescription: req.body.businessDescription,
    businessAddress: req.body.businessAddress,
    businessPhone: req.body.businessPhone,
    businessPic: req.body.businessPic,
    customer_id: req.customer_id,
  });

  post = await card.save();
  res
    .status(200)
    .json(
      `${card.businessName} added succesfully > details: businessName:${card.businessName},businessDescription:${card.businessDescription},businessAddress:${card.businessAddress},businessPhone:${card.businessPhone},businessPic:${card.businessPic}, customer_id:${card.customer_id}`
    );
});

//////////////////////////////
////////////////////////////
//////////////////////////////
router.get("/cards/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).json({
      success: false,
      data: [],
      message: "It is not a valid mongodb id",
    });

  const card = await CardModel.find({ customer_id: { $type: "objectId" } });

  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  return res.status(200).json({
    success: true,
    data: card,
    message: "Finding successful!",
  });
});

///////////////////
///////////////////////
/////

router.delete("/cards/:id", async (req, res) => {
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
router.put("/cards/:id", async (req, res) => {
  const { error, value } = validateCard(req.body);

  if (error) {
    res.status(404).json(`error updating card: ${error}`);
    return;
  }

  const card = await CardModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        businessName: req.body.businessName,
        businessDescription: req.body.businessDescription,
        businessAddress: req.body.businessAddress,
        businessPhone: req.body.businessPhone,
        businessPic: req.body.businessPic,
        customer_id: req.customer_id,
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

module.exports = router;
