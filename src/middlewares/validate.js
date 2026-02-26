/**
 * Middleware de validación para crear/reemplazar artículos.
 *
 * Valida:
 * - title: requerido, entre 3 y 100 caracteres
 * - content: requerido, mínimo 10 caracteres
 * - author: requerido
 *
 * En caso de error responde:
 *   Status 422
 *   Body: { error: "descripción del error", field: "nombre del campo" }
 */
function validateArticle(req, res, next) {
  // TODO
}

module.exports = { validateArticle };
