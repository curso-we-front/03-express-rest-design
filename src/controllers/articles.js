const path = require("path")
const fs = require("fs")
const DATA_PATH = path.join(__dirname, "../../data/articles.json")

// Carga inicial de datos en memoria
let articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
let nextId = Math.max(...articles.map((a) => a.id)) + 1

function getAll(req, res) {
  // TODO
  const publishedArticles = articles.filter((article) => article.published)
  res.status(200).json(publishedArticles)
}

/**
 * GET /articles/:id
 */
function getOne(req, res, next) {
  const id = Number(req.params.id)
  const singleArticle = articles.find((article) => article.id === id)
  if (!singleArticle) {
    return res.status(404).json({ error: "No existe el artículo." })
  }
  res.status(200).json(singleArticle)
}

/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
function create(req, res) {
  const { title, content, author } = req.body
  const newArticle = {
    id: nextId++,
    title,
    content,
    author,
    published: false,
    createdAt: new Date(),
  }
  articles.push(newArticle)
  res.status(201).json(newArticle)
}

/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
function replace(req, res, next) {
  const { id, title, content, author, published } = req.body
  const articleId = Number(req.params.id)
  const index = articles.findIndex((article) => article.id === articleId)
  if (index === -1) {
    return res.status(404).json({ error: "No existe el artículo." })
  }
  articles[index] = {
    id: articleId,
    title,
    content,
    author,
    published,
    createdAt: articles[index].createdAt,
  }
  res.status(200).json(articles[index])
}

/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
function update(req, res, next) {
  const id = Number(req.params.id)
  const index = articles.findIndex((article) => article.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Artículo no encontrado" })
  }
  articles[index] = { ...articles[index], ...req.body }
  res.status(200).json(articles[index])
}

/**
 * DELETE /articles/:id — Elimina el artículo
 */
function remove(req, res, next) {
  const id = Number(req.params.id)
  const index = articles.findIndex((article) => article.id === id)
  if (index === -1) {
    return res.status(404).json({ error: "Artículo no encontrado" })
  }
  articles.splice(index, 1)
  res.status(204).send()
}
module.exports = { getAll, getOne, create, replace, update, remove }
