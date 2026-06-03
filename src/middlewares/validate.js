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
  const { title, content, author } = req.body
  if (!title) {
    return res
      .status(422)
      .json({ error: "El título es obligatorio", field: "title" })
  }
  if (title.length < 3 || title.length > 100) {
    return res.status(422).json({
      error: "El título debe tener más de 3 y menos de 100 carácteres.",
      field: "title",
    })
  }

  if (!content) {
    return res
      .status(422)
      .json({ error: "El contenido es obligatorio", field: "content" })
  }
  if (content.length < 10) {
    return res.status(422).json({
      error: "El contenido debe tener al menos 10 carácteres",
      field: "content",
    })
  }
  if (!author) {
    return res
      .status(422)
      .json({ error: "El autor es obligatorio", field: "author" })
  }
  next()
}

module.exports = { validateArticle }
