const path = require("path");
const fs = require("fs");

const DATA_PATH = path.join(__dirname, "../../data/articles.json");

let articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
let nextId = Math.max(...articles.map((a) => a.id)) + 1;

/**
 * GET /articles — Devuelve artículos publicados
 */
function getAll(req, res) {
  res.json(articles);
}

/**
 * GET /articles/:id
 */
function getOne(req, res, next) {
  const idArticle = Number(req.params.id);
  const article = articles.find((article) => article.id === idArticle);
  if (!article)
    return res.status(404).json({ error: "Artículo no encontrado" });
  res.json(article);
}

/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
function create(req, res) {
  const newArticle = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    published: false,
  };

  articles.push(newArticle);

  fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al guardar el artículo" });
    }

    res.status(201).json({ message: "Artículo creado", article: newArticle });
  });
}

/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
function replace(req, res, next) {
  const id = Number(req.params.id);

  const indexArticle = articles.findIndex((article) => article.id === id);

  if (indexArticle < 0) {
    return res.status(404).send({ error: "No existe el articulo" });
  }

  articles[indexArticle] = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    published: false,
  };

  fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al actualizar el artículo" });
    }

    res
      .status(201)
      .json({ message: "Artículo actualizado", article: articles });
  });
}

/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
function update(req, res, next) {
  const id = Number(req.params.id);
  const updatedInfo = req.body;

  const indexArticle = articles.findIndex((article) => article.id === id);

  if (indexArticle < 0) {
    return res.status(404).send({ error: "No existe el articulo" });
  }

  const updatedArticle = articles[indexArticle];

  Object.assign(updatedArticle, updatedInfo);

  fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2), () => {
    res.send(`Artículo actualizado con ID: ${id}`);
  });
}

/**
 * DELETE /articles/:id — Elimina el artículo
 */
function remove(req, res) {
  const id = Number(req.params.id);

  articles = articles.filter((article) => article.id !== id);

  fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2), () => {
    res.json({ message: "Artículo borrado correctamente" });
  });
}

module.exports = { getAll, getOne, create, replace, update, remove };
