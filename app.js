const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/UserRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/user",UserRouter);

module.exports = app;