require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganSetting = 
  NODE_ENV === "production"
  ? "tiny"
  : "dev"

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send("Hello World!");
});

const errorHandler = (error,req,res,next) => {
  let response;
  if (NODE_ENV === "production") {
    response = { error : { message: "server error" } }
  }else{
    console.error(error);
    response = { message: error.message, error }
  }
  res.status(500).json(response);
}

app.use(errorHandler);

module.exports = app;