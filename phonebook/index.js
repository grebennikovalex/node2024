import express from "express";
import DatabaseService from "./database-service.js";
import { getJwt, isJwtOk, getUserIdFromJwt } from "./jwt-service.js";
import bodyParser from "body-parser";
import { env } from "node:process";
import cors from "cors";
import bcrypt from "bcrypt";

const db = new DatabaseService();
const app = express();

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = env.PROJECT12_PORT || 3000;

const jwtSecret = env.PROJECT12_JWT_SECRET || "SimpleSecret";

app.post("/api/v1.0/login", async (req, res) => {
  const data = req.body;
  const user = await db.getUserByName(data.userName);

  if (!user) {
    res.status(404);
    res.send({ userName: data.userName, password: data.password });
  } else {
    try {
      bcrypt.compare(data.password, user.password, (err, check) => {
        if (err) throw err;
        if (data.userName === user.userName && check) {
          res.status(200);
          const payload = { id: user.id };
          res.send({ token: getJwt(payload, jwtSecret) });
        } else {
          res.status(401);
          res.send({ status: "unauthorized" });
        }
      });
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }
});

app.post("/api/v1.0/user", async (req, res) => {
  const data = req.body;

  try {
    const hashedpass = await bcrypt.hash(data.password, 8);
    const newUser = await db.createUser({ userName: data.userName, password: hashedpass });
    res.status(200);
    const payload = { id: newUser.id };
    res.send({ token: getJwt(payload, jwtSecret) });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
});

app.get("/api/v1.0/user", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");

  if (isJwtOk(jwt, jwtSecret)) {
    try {
      const id = getUserIdFromJwt(jwt);
      const currentUser = await db.getCurrentUser(id);
      currentUser.password = undefined;
      res.send(currentUser);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.get("/api/v1.0/contacts", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");
  const userId = getUserIdFromJwt(jwt);

  if (isJwtOk(jwt, jwtSecret)) {
    try {
      const contacts = await db.getAll();
      res.send(contacts.filter((contact) => contact.userId === userId));
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.get("/api/v1.0/contacts/:id", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");
  const id = Number(req.params.id);
  if (isJwtOk(jwt, jwtSecret)) {
    try {
      const oneItem = await db.getOne(id);
      res.send(oneItem);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.post("/api/v1.0/contacts/", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");
  const userId = getUserIdFromJwt(jwt);
  const data = { userId, ...req.body };

  if (isJwtOk(jwt, jwtSecret)) {
    try {
      const createdItem = await db.create(data);
      res.status(201);
      res.send(createdItem);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.patch("/api/v1.0/contacts/:id", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");
  const id = Number(req.params.id);
  const data = req.body;

  if (isJwtOk(jwt, jwtSecret)) {
    try {
      await db.update(id, data);
      res.status(200);
      res.send(null);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.delete("/api/v1.0/contacts/:id", async (req, res) => {
  const jwt = req.headers.authorization.replace("Bearer ", "");
  const id = Number(req.params.id);

  if (isJwtOk(jwt, jwtSecret)) {
    try {
      await db.delete(id);
      res.status(204);
      res.send(null);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  } else {
    res.status(401);
    res.send({ status: "unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
