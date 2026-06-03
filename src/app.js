const express = require("express")
const app = express()
const articlesRoutes = require("./routes/articles")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(articlesRoutes)

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "ok" })
})

app.use(errorHandler)

module.exports = app
