require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB = require(__dirname + "/schema.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb://localhost:27017/notesDB")

app.get('/', (req, res) => {
  res.send('<h1>Root</h1>')
})

app.get('/notes', (req, res) => {
  DB.Note.find((err, notes) => {
    if(err) {
      res.send("Something went wrong when fetching the notes data.")
    } else {
      res.send(notes)
    }
  })
})

app.post('/note', (req, res) => {
  const reqTitle = req.body.title;
  const reqContent = req.body.content;
  DB.Note.create({ title: reqTitle,
                   content: reqContent }, (err) => {
  if(err){
    res.send(err)
  } else {
    res.send('Note successfully created!')
  }
})
})

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`)
})
