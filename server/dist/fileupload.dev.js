"use strict";

var express = reuire('express');

var upload = require('express-fileupload');

var app = express();
app.use(upload());
app.get('/', function (req, res) {
  res.sendFile(__direname + '');
});
app.post('/', function (req, res) {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;
    console.log(filename);
  }
});