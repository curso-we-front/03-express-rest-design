const { body, validationResult } = require("express-validator");
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = errors.array()[0];
    return res.status(422).json({
      error: err.msg,
      field: err.param,
    });
  }

  next();
}

const articleRules = [
  body("title")
    .notEmpty()
    .withMessage("Título requerido")
    .isLength({ min: 3, max: 100 })
    .withMessage("El minimo de caracteres es 3"),
  body("content")
    .notEmpty()
    .withMessage("Contenido requerido")
    .isLength({ min: 10 })
    .withMessage("El contenido tiene que tener al menos 10 caracteres"),
  body("author").notEmpty().withMessage("Autor requerido"),
];

module.exports = { validateArticle, articleRules };
