const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const auth = require("./routes/auth");
const app = express();

mongoose
  .connect("mongodb://localhost/noaCrm", {
    //// change to noaCrm
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//
const port = 3000;
app.listen(port, () => {
  console.log("Server started on port 3000");
});
//

const customersRouter = require("./routes/customers");
app.use("/", customersRouter);

//
const cardsRouter = require("./routes/cards");
app.use("/", cardsRouter);

///

// app.use("/auth", auth);

//
module.exports = app;
