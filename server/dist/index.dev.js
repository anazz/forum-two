"use strict";

var express = require("express");

var app = express();

var mysql = require("mysql");

var cors = require("cors");

var fs = require('fs');

var Buffer = require('buffer/').Buffer;

app.use(cors());
app.use(express.json());
var queryResult = [];
var db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "root",
  database: "forum"
});
app.post("/create", function (req, res) {
  var title = req.body.title;
  var image = req.body.image;
  var message = req.body.message;
  db.query("INSERT INTO topics (title, image, message) VALUES (?,?,?)", [title, image, message], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/topics", function (req, res) {
  db.query("SELECT * FROM topics", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/update", function (req, res) {
  var title = req.body.title;
  var image = req.body.image;
  var message = req.body.message;
  db.query("UPDATE topics SET title = ? image = ? WHERE id = ?", [title, image, message], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app["delete"]("/delete/:id", function (req, res) {
  var id = req.params.id;
  db.query("DELETE FROM topics WHERE id = ?", id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); //POSTS

app.post("/create/posts", function (req, res) {
  var author = req.body.author;
  var content = req.body.content;
  var topicId = req.body.topic_id;
  var topicTitle = req.body.topic_title;
  db.query("INSERT INTO posts (author, content, topic_id, topic_title) VALUES (?,?,?,?)", [author, content, topicId, topicTitle], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/topics/posts", function (req, res) {
  db.query("SELECT * FROM topics LEFT JOIN posts ON topics.id = posts.topic_id WHERE topics.id = posts.topic_id", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      // res.send("Posts fetched");
      // res.send(result);
      return res.status(200).send(result);
    }
  });
});
app.listen(3001, function () {
  console.log("Yey, your server is running on port 3001");
});