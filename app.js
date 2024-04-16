const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");

const { connectToDatabase } = require("./db/db.js");

const app = express()

app.use(cors())


app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
      res.status(500).send(err.message);
  } else {
      res.status(500).json({ err: "Something went wrong" });
  }
});


// API  Routes

// app.use('/users', usersRouter); TODO -> create users Router

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
      console.log("Now listening on port", port);
  });
};

connectToDatabase().then(() => {
  listenForRequests();
});
