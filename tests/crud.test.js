const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

const newArticle = {
  title: 'Artículo de prueba',
  content: 'Contenido suficientemente largo para ser válido.',
  author: 'Tester'
};

describe('GET /articles', () => {
  test('200 y array de publicados', async () => {
    const res = await request.get('/articles');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /articles', () => {
  test('201 y devuelve el artículo creado', async () => {
    const res = await request.post('/articles').send(newArticle);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newArticle.title);
  });

  test('422 si falta title', async () => {
    const res = await request.post('/articles').send({ content: 'Algo', author: 'X' });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('title');
  });

  test('422 si content es muy corto', async () => {
    const res = await request.post('/articles').send({ title: 'Oky', content: 'Corto', author: 'X' });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('content');
  });
});

describe('GET /articles/:id', () => {
  test('200 y devuelve el artículo', async () => {
    const created = await request.post('/articles').send(newArticle);
    const id = created.body.id;
    const res = await request.get(`/articles/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.title).toBe(newArticle.title);
  });

  test('404 si no existe', async () => {
    const res = await request.get('/articles/99999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /articles/:id', () => {
  test('200 y devuelve el artículo reemplazado', async () => {
    const created = await request.post('/articles').send(newArticle);
    const id = created.body.id;
    const replacement = {
      title: 'Título reemplazado',
      content: 'Contenido nuevo suficientemente largo para ser válido.',
      author: 'Autor nuevo',
      published: true,
    };
    const res = await request.put(`/articles/${id}`).send(replacement);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(replacement.title);
    expect(res.body.author).toBe(replacement.author);
  });

  test('404 si no existe', async () => {
    const replacement = {
      title: 'Título reemplazado',
      content: 'Contenido nuevo suficientemente largo para ser válido.',
      author: 'Autor nuevo',
      published: true,
    };
    const res = await request.put('/articles/99999').send(replacement);
    expect(res.status).toBe(404);
  });
});

describe('PATCH /articles/:id', () => {
  test('actualiza el campo title', async () => {
    const created = await request.post('/articles').send(newArticle);
    const id = created.body.id;
    const res = await request.patch(`/articles/${id}`).send({ title: 'Nuevo título actualizado' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Nuevo título actualizado');
    expect(res.body.content).toBe(newArticle.content); // no debe cambiar
  });

  test('404 si no existe', async () => {
    const res = await request.patch('/articles/99999').send({ title: 'x' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /articles/:id', () => {
  test('204 al eliminar', async () => {
    const created = await request.post('/articles').send(newArticle);
    const res = await request.delete(`/articles/${created.body.id}`);
    expect(res.status).toBe(204);
  });

  test('404 si no existe', async () => {
    const res = await request.delete('/articles/99999');
    expect(res.status).toBe(404);
  });
});
