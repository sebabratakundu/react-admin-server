require("dotenv").config();
const mongoose = require('mongoose');
const mongoUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_USERNAME}.tzwtq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl);
const Note = require("../schema/note");

const create = async (request,response)=>{
  const data = request.body;
  try {
    let newNote = new Note(data);
    const created = await newNote.save();
    response.status(200);
    response.json(created);
  }
  catch(err)
  {
    response.status(424);
    response.json({
      success: false
    });
  }
}

const fetch = async (request,response)=>{
    const myNote = await Note.find({userId:request.params.id});
    if(myNote.length > 0)
    {
      response.status(200);
      response.json({
        notes: myNote
      });
    }
    else {
      response.status(404);
      response.json({
        message: "notes not available"
      });
    }
}

const deleteNote = async (request,response)=>{
    try {
      await Note.findByIdAndDelete(request.params.id);
      response.status(200);
      response.json({
        success: true
      });
    }
    catch(err)
    {
      response.status(424);
      response.json({
        success: false
      });
    }
}

module.exports = {
  create,
  fetch,
  deleteNote
}
