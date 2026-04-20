const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app);

const validArticle = {
  title: 'Título válido',
  content: 'Contenido suficientemente largo para ser válido.',
  author: 'Autor',
};

describe('POST /articles — validación de campos requeridos', () => {
  test('422 con field:title si falta title', async () => {
    const res = await request.post('/articles').send({ content: validArticle.content, author: validArticle.author });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('title');
  });

  test('422 con field:content si falta content', async () => {
    const res = await request.post('/articles').send({ title: validArticle.title, author: validArticle.author });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('content');
  });

  test('422 con field:author si falta author', async () => {
    const res = await request.post('/articles').send({ title: validArticle.title, content: validArticle.content });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('author');
  });
});

describe('POST /articles — validación de longitud', () => {
  test('422 con field:title si title tiene menos de 3 caracteres', async () => {
    const res = await request.post('/articles').send({ ...validArticle, title: 'AB' });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('title');
  });

  test('422 con field:title si title tiene más de 100 caracteres', async () => {
    const res = await request.post('/articles').send({ ...validArticle, title: 'A'.repeat(101) });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('title');
  });

  test('422 con field:content si content tiene menos de 10 caracteres', async () => {
    const res = await request.post('/articles').send({ ...validArticle, content: 'Corto' });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('content');
  });
});

describe('PUT /articles/:id — validación de campos requeridos', () => {
  let articleId;

  beforeEach(async () => {
    const created = await request.post('/articles').send(validArticle);
    articleId = created.body.id;
  });

  test('422 con field:title si falta title', async () => {
    const res = await request.put(`/articles/${articleId}`).send({ content: validArticle.content, author: validArticle.author, published: false });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('title');
  });

  test('422 con field:content si falta content', async () => {
    const res = await request.put(`/articles/${articleId}`).send({ title: validArticle.title, author: validArticle.author, published: false });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('content');
  });

  test('422 con field:author si falta author', async () => {
    const res = await request.put(`/articles/${articleId}`).send({ title: validArticle.title, content: validArticle.content, published: false });
    expect(res.status).toBe(422);
    expect(res.body.field).toBe('author');
  });
});