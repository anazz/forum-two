exports.index = 
app.post("/create", (req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const image = req.body.image;

    db.query(
        "INSERT INTO topics (title, date, image) VALUES (?,?,?)",
            [title, date, image],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Values Inserted");
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
  db.query(
    "UPDATE topics SET title = ? image = ? WHERE id = ?",
    [title, image],
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