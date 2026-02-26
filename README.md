# 03 — Diseño REST: Verbos, Status Codes y Estructura

## Objetivo

Dominar las convenciones de una API REST bien diseñada: uso correcto de verbos HTTP, status codes semánticos, estructura de carpetas escalable y manejo completo de CRUD en memoria.

## Contexto

Ampliamos la API del blog con operaciones de escritura (crear, editar, borrar). Los datos aún están en memoria (array) — la persistencia en base de datos llegará en los siguientes ejercicios.

## Tareas

### Tarea 1 — CRUD completo de artículos (`src/routes/articles.js`)
Implementa los siguientes endpoints:

| Método   | Ruta              | Descripción                            | Status éxito |
|----------|-------------------|----------------------------------------|-------------|
| GET      | `/articles`       | Lista todos los artículos publicados   | 200          |
| GET      | `/articles/:id`   | Obtiene un artículo por id             | 200          |
| POST     | `/articles`       | Crea un artículo nuevo                 | 201          |
| PUT      | `/articles/:id`   | Reemplaza un artículo completo         | 200          |
| PATCH    | `/articles/:id`   | Actualiza campos parciales             | 200          |
| DELETE   | `/articles/:id`   | Elimina un artículo                    | 204          |

### Tarea 2 — Validación en POST y PUT (`src/middlewares/validate.js`)
Crea un middleware `validateArticle` que verifique:
- `title` existe y tiene entre 3 y 100 caracteres
- `content` existe y tiene al menos 10 caracteres
- `author` existe
- Si alguno falla, responde `422` con `{ error: "...", field: "..." }`

### Tarea 3 — Estructura de controladores (`src/controllers/articles.js`)
Separa la lógica de los handlers en un controlador independiente. El router solo debe hacer `.get('/articles', articleController.getAll)`, etc.

## Estructura esperada

```
03-express-rest-design/
├── data/
│   └── articles.json
├── src/
│   ├── controllers/
│   │   └── articles.js     ← Tarea 3
│   ├── routes/
│   │   └── articles.js     ← Tarea 1
│   ├── middlewares/
│   │   ├── validate.js     ← Tarea 2
│   │   └── errorHandler.js ← igual que ejercicio anterior
│   └── app.js
├── tests/
│   ├── crud.test.js
│   └── validate.test.js
└── package.json
```

## Cómo empezar

```bash
npm install
npm test
npm start
```

## Criterios de evaluación

- [ ] GET devuelve 200, POST devuelve 201, DELETE devuelve 204
- [ ] PUT/PATCH con id inexistente devuelven 404
- [ ] POST con datos inválidos devuelve 422 con el campo con error
- [ ] La lógica está en el controlador, no en el router
- [ ] Los tests pasan
