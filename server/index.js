require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;
const moongose = require("mongoose");

console.log(process.env.DATABASE_URL);
moongose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = moongose.connection;

db.on("error", error => console.error("db error"));
db.once("open", () => console.log("db connected"));
app.use(express.json());


const postsRouter = require("./routes/posts");

app.use("/posts", authenticateToken, postsRouter);


function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
