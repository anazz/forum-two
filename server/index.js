const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fs = require('fs');
let Buffer = require('buffer/').Buffer;


app.use(cors());
app.use(express.json());

const queryResult = [];

const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "root",
  database: "forum",
});

app.post("/create", (req, res) => {
    const title = req.body.title;
    const image = req.body.image;
    const message = req.body.message;

    db.query (
        "INSERT INTO topics (title, image, message) VALUES (?,?,?)",
            [title, image, message],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
    );
});

app.get("/topics", (req, res) => {

    db.query("SELECT * FROM topics", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
  const title = req.body.title;
  const image = req.body.image;
  const message = req.body.message;
  db.query(
    "UPDATE topics SET title = ? image = ? WHERE id = ?",
    [title, image, message],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM topics WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//POSTS

app.post("/create/posts", (req, res) => {
    const author = req.body.author
    const content = req.body.content;
    const topicId = req.body.topic_id;
    const topicTitle = req.body.topic_title;
    db.query (
        "INSERT INTO posts (author, content, topic_id, topic_title) VALUES (?,?,?,?)",
            [author, content, topicId, topicTitle],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
    );
});

app.get("/topics/posts", (req, res) => {

    db.query(`SELECT * FROM topics LEFT JOIN posts ON topics.id = posts.topic_id WHERE topics.id = posts.topic_id`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // res.send("Posts fetched");
          // res.send(result);
          return res.status(200).send(result)
        }
    });
});

app.listen(3001, () => {
   console.log("Yey, your server is running on port 3001");
});