import express from "express";
import DatabaseService from "./database-service.js";
import bodyParser from "body-parser";
const db = new DatabaseService();
const app = express();

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = 3000;
app.get("/api/v1.0/contacts", (req, res) => {
  const allData = db.getAll();
  setTimeout(() => {
    res.send(allData);
  }, 3000);
});
app.get("/api/v1.0/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(500);
    res.send({ error: "Error 500" });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }
  res.send(oneItem);
});

app.post("/api/v1.0/contacts/", (req, res) => {
  const data = req.body;

  if (!db.create(data)) {
    res.status(500);
    res.send({ error: `Error 500 when creating item with id ${id}` });
    return;
  }

  res.status(201);
  res.send(data);
});

app.patch("/api/v1.0/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(500);
    res.send({ error: "Error 500" });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }

  const data = req.body;

  if (!db.update(id, data)) {
    res.status(500);
    res.send({ error: `Error 500 when updating item with id ${id}` });
    return;
  }

  res.status(200);
  res.send(data);
});

app.delete("/api/v1.0/contacts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(500);
    res.send({ error: "Error 500" });
    return;
  }

  const oneItem = db.getOne(id);

  if (!oneItem) {
    res.status(404);
    res.send({ error: `Item with id=${id} not found` });
    return;
  }

  if (db.delete(id)) {
    res.status(204);
    res.end();
  } else {
    res.status(500);
    res.send({ error: `Error 500 when deleting item with id ${id}` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
