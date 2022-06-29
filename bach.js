// const { error } = validateCard(req.body);
// if (error) return res.status(400).send(error.details.message);

// try {
//   const {
//     customer_id,
//     businessName,
//     businessDescription,
//     businessAddress,
//     businessPhone,
//     businessPic,
//   } = req.body;
//   const card = await CardModel.updateOne({
//     customer_id,
//     businessName,
//     businessDescription,
//     businessAddress,
//     businessPhone,
//     businessPic,
//   });

//   if (!card)
//     return res.status(404).send("The card with the given ID was not found.");

//   const newcard = await CardModel.findOne({
//     _id: req.params.id,
//   });
//   res.status(200).send(newcard);
// } catch (err) {
//   console.log(err);
//   res.status(400).send(`error adding Card`);
//   return;
// }

// router.put("/updatecard/:id", async (req, res) => {
//   const { error, value } = validateCard(req.body);
//   //
//   if (error) {
//     res.status(404).json(`error updating card: ${error}`);
//     return;
//   }

//   const card = await CardModel.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         customer_id: req.body.customer_id,
//         businessName: req.body.businessName,
//         businessDescription: req.body.businessDescription,
//         businessAddress: req.body.businessAddress,
//         businessPhone: req.body.businessPhone,
//         businessPic: req.body.businessPic,
//       },
//     }
//   );

//   if (!card)
//     return res.status(404).send("The card with the given ID was not found.");

//   const cardtwo = await CardModel.findOne({
//     _id: req.params.id,
//   });
//   res.status(200).send(cardtwo);
// });
