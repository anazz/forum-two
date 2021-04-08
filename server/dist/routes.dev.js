"use strict";

exports.index = app.post("/create", function (req, res) {
  var title = req.body.title;
  var date = req.body.date;
  var image = req.body.image;
  db.query("INSERT INTO topics (title, date, image) VALUES (?,?,?)", [title, date, image], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted");
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
  db.query("UPDATE topics SET title = ? image = ? WHERE id = ?", [title, image], function (err, result) {
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
});