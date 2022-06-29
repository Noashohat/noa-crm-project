const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config/dev");
const jwt = require("jsonwebtoken");
const auth = require("./models/auth");

mongoose
  .connect("mongodb://localhost/noaCrm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(bodyParser.urlencoded({ extended: true }));

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;
app.listen(port, () => {
  console.log("Server started on port 3001");
});
//

const customersRouter = require("./routes/customers");
app.use("/", customersRouter);
const customersInfoRouter = require("./routes/customersInfo");
app.use("/", auth, customersInfoRouter);

//
const cardsRouter = require("./routes/cards");
app.use("/", auth, cardsRouter);

module.exports = app;
