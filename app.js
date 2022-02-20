require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DB = require(__dirname + "/schema.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb://localhost:27017/notesDB")

app.get('/', (req, res) => {
    DB.Note.create({title: 'this is title test 2', content: 'this is content 2'}, () => {
    res.send('<h1>Server Test</h1>')
  })

})

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`)
})
