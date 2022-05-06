require("dotenv").config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../schema/user");
const Token = require("../services/token");
const mongoUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_USERNAME}.tzwtq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);

router.post('/', async function(request, response) {
  try {
    const newData = new User(request.body);
    const data = await newData.save();

    response.status(200);
    response.json({
      message: "success",
      token: Token.create({
        name: data.fullname,
        email: data.email,
        mobile: data.mobile,
        userId: data._id
      })
    })
  }
  catch(err)
  {
    response.status(424);
    response.json({
      message: "Username already exist !"
    })
  }
});

module.exports = router;
