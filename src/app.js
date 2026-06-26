const express = require("express");
const app = express();
const routers = require("./routes/articles");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routers);

module.exports = app;
