const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(__dirname, "../../data/articles.json");

// Carga inicial de datos en memoria
let articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
let nextId = Math.max(...articles.map((a) => a.id)) + 1;

/**
 * GET /articles — Devuelve artículos publicados
 */
function getAll(req, res) {
  return res.json(articles);
}

/**
 * GET /articles/:id
 */
function getOne(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const article = articles.find((article) => article.id === id);
    res.json(article);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
function create(req, res, next) {
  try {
    const { title, content, author } = req.body;

    const newArticle = {
      id: nextId++,
      title: title,
      content: content,
      author: author,
      published: false,
      createdAt: new Date(),
    };
    articles.push(newArticle);
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    return res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
function replace(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { title, content, author, published } = req.body;
    const articleIndex = articles.findIndex((article) => article.id === id);
    articles[articleIndex] = {
      ...articles[articleIndex],
      id: id,
      title: title,
      content: content,
      author: author,
      published: published,
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    return res.status(200).json({ message: "File saved successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const editedFields = req.body;
    const articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex === -1) {
      return res.status(404).json({ error: "Article not found" });
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      ...editedFields,
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    return res.status(200).json(articles[articleIndex]);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /articles/:id — Elimina el artículo
 */
function remove(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex !== -1) {
      articles.splice(articleIndex, 1);
    } else {
      return res.status(404).json({ error: "Article not found" });
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    return res.status(204).json({ message: "File saved successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getOne, create, replace, update, remove };
