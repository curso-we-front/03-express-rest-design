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
  const { title, content, author } = req.body;
  try {
    if (req.method === "POST" || req.method === "PUT") {
      if (!title) {
         
        return res
          .status(422)
          .json({ error: "The article has not been saved", field: "title" });
      }
      if (!content) {
        return res
          .status(422)
          .json({ error: "The article has not been saved", field: "content" });
      }
      if (!author) {
        return res
          .status(422)
          .json({ error: "The article has not been saved", field: "author" });
      }
    }

    if (title && (title.length < 3 || title.length > 100)) {
      return res
        .status(422)
        .json({ error: "The article has not been saved", field: "title" });
    }
    if (content && content.length < 10) {
      return res
        .status(422)
        .json({ error: "The article has not been saved", field: "content" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { validateArticle };
