require("dotenv").config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongoUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_USERNAME}.tzwtq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);
const User = require("../schema/user");

router.get('/:id', async function(request, response) {
  let id = request.params.id;
  try {
    const data = await User.findById(id);
    if(data)
    {
      // Note : In production must update the logout status false in user collection
      response.status(200);
      response.json({
        success: true
      });
    }
    else {
      response.status(409);
      response.json({
        success: false
      });
    }
  }
  catch(err)
  {
    response.status(409);
    response.json({
      success: false
    });
  }
});

module.exports = router;
