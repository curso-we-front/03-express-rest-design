const path = require("path")
const fs = require("fs")
const express = require("express")
const router = express.Router()
const DATA_PATH = path.join(__dirname, "../../data/articles.json")
const {
  getAll,
  getOne,
  create,
  replace,
  update,
  remove,
} = require("../controllers/articles")
const { validateArticle } = require("../middlewares/validate.js")

// Carga inicial de datos en memoria
let articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
let nextId = Math.max(...articles.map((a) => a.id)) + 1

/**
 * GET /articles — Devuelve artículos publicados
 */

router.get("/articles", getAll)
/**
 * GET /articles/:id
 */
router.get("/articles/:id", getOne)
/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
router.post("/articles", validateArticle, create)
/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
router.put("/articles/:id", validateArticle, replace)
/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
router.patch("/articles/:id", update)
/**
 * DELETE /articles/:id — Elimina el artículo
 */
router.delete("/articles/:id", remove)

module.exports = router
