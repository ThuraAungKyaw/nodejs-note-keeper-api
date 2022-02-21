const mongoose = require('mongoose');

const note = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
   content: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    required: true
  }
})

const Note = mongoose.model('note', note);

exports.Note = Note;
