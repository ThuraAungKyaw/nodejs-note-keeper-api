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

app.patch('/note/:note_id', (req, res) => {

  const note_id = req.params.note_id;

  if(note_id){
    DB.Note.findOneAndUpdate({_id:note_id}, {...req.body}, (err, note) => {

      if(err) {
        res.send(`Something went wrong when updating the data. <br/> ${err}`)
      } else {
        res.send(`Successfully updated the note with id ${note_id}!`)
      }

    })
  } else {
      res.send("The note_id and/or the request body cannot be empty.")
  }



})

app.post('/note', (req, res) => {
  const reqTitle = req.body.title;
  const reqContent = req.body.content;
  DB.Note.create({ title: reqTitle,
                   content: reqContent,
                   created_on: new Date()
                  }, (err) => {
  if(err){
    res.send(`There was an error while creating a new note. <br/> ${err}`)
  } else {
    res.send('Note successfully created!')
  }
})
})

app.delete('/note/:note_id', (req, res) => {
  const note_id = req.params.note_id;
  if(note_id){

  } else {

  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`)
})
