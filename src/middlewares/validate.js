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
const MIN_TITLE_LENGTH = 3;
const MAX_TITLE_LENGTH = 100;

function validateArticle(req, res, next) {
  // TODO
  try {
    const { title, content, author } = req.body;
    if (!title) {
      return res
        .status(422)
        .json({ error: "The title is missing", field: "title" });
    }

    if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
      return res
        .status(422)
        .json({ error: "The title is incorrect", field: "title" });
    }

    if (!content) {
      return res.status(422).json({
        error: "The content is missing",
        field: "content",
      });
    }

    if (content.length <= 10) {
      return res.status(422).json({
        error: "The content is missing or too short",
        field: "content",
      });
    }
    
    if (!author) {
      return res
        .status(422)
        .json({ error: "The author is missing", field: "author" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validateArticle };
