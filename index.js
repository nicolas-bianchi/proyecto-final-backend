const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const users = require("./routes/users");
const estates = require("./routes/estates");

app.use("/api", users);
app.use("/api", estates);

app.listen(3001, () => {
  console.log("server 3001");
});
