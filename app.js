const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require('./routes/users');

const { connectToDatabase } = require("./db/db.js");

const app = express()

app.use(cors());
app.use(bodyParser.json());


app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
      res.status(500).send(err.message);
  } else {
      res.status(500).json({ err: "Something went wrong" });
  }
});


// API  Routes

app.use('/users', usersRouter); 


// 404 Handler 

app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Generic error handler 

app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
      res.status(500).send(err.message);
  } else {
      res.status(500).json({ err: "Something went wrong" });
  }
});

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
      console.log("Now listening on port", port);
  });
};

connectToDatabase().then(() => {
  listenForRequests();
});

module.exports = app