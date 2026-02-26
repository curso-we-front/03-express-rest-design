const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '../../data/articles.json');

// Carga inicial de datos en memoria
let articles = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
let nextId = Math.max(...articles.map(a => a.id)) + 1;

/**
 * GET /articles — Devuelve artículos publicados
 */
function getAll(req, res) {
  // TODO
}

/**
 * GET /articles/:id
 */
function getOne(req, res, next) {
  // TODO
}

/**
 * POST /articles — Crea un artículo
 * Campos requeridos: title, content, author
 * Asigna id autoincremental y published: false por defecto
 */
function create(req, res) {
  // TODO
}

/**
 * PUT /articles/:id — Reemplaza el artículo completo
 */
function replace(req, res, next) {
  // TODO
}

/**
 * PATCH /articles/:id — Actualiza campos parcialmente
 */
function update(req, res, next) {
  // TODO
}

/**
 * DELETE /articles/:id — Elimina el artículo
 */
function remove(req, res, next) {
  // TODO
}

module.exports = { getAll, getOne, create, replace, update, remove };
