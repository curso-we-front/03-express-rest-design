const path = require("path");
const fs = require("fs");
const { log } = require("console");

const DATA_PATH = path.join(__dirname, "../../data/articles.json");

// Carga inicial de datos en memoria
let articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
/**
 * GET /articles — Devuelve artículos publicados
 */
function getAll(req, res) {
  // TODO
  const publishedArticles = articles.filter((article) => article.published);
  return res.json(publishedArticles);
}

/**
 * GET /articles/:id
 */
function getOne(req, res, next) {
  // TODO
  try {
    const id = Number(req.params.id);
    const article = articles.find((article) => article.id === id);

    if (!article) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.json(article);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
function create(req, res) {
  // TODO
  const nextId = Math.max(...articles.map((a) => a.id)) + 1;
  const { title, content, author } = req.body;
  const newArticle = {
    id: nextId,
    title: title,
    content: content,
    author: author,
    published: false,
    createdAt: new Date(),
  };
  articles.push(newArticle);
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
  return res.status(201).json(newArticle);
}

/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
function replace(req, res, next) {
  // TODO
  try {
    const id = Number(req.params.id);
    const { title, content, author, published } = req.body;
    const articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex == -1) {
      return res.status(404).json({ error: "not found" });
    }
    const replacedArticle = {
      id: id,
      title: title,
      content: content,
      author: author,
      published: published,
      createdAt: new Date(),
    };
    articles[articleIndex] = replacedArticle;
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    res.json(replacedArticle);
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
function update(req, res, next) {
  // TODO
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex == -1) {
      return res.status(404).json({ error: "not found" });
    }
    const updatedArticle = {
      ...articles[articleIndex],
      ...updatedFields,
    };
    articles[articleIndex] = updatedArticle;
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /articles/:id — Elimina el artículo
 */
function remove(req, res, next) {
  // TODO
  try {
    const id = Number(req.params.id);
    const articleIndex = articles.findIndex((article) => article.id === id);
    if (articleIndex == -1) {
      return res.status(404).json({ error: "not found" });
    }
    articles.splice(articleIndex, 1);
    fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
    return res.status(204).json({ message: "article deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAll, getOne, create, replace, update, remove };
