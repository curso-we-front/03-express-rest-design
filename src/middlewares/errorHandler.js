function errorHandler(err, req, res, next) {
  const status = res.status || 500
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack)
  }
  res.status(status).json({ error: err.message })
}
module.exports = errorHandler
