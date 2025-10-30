import { describe, expect, it } from '@jest/globals';
import { helloWorld } from './hello-world';

describe('typeScript test suite', () => {
  it('should return "Hello world!"', () => {
    expect.assertions(1);
    expect(helloWorld()).toBe('Hello, World!');
  });
});


import request from 'supertest';
import { server } from './fonctions';

describe('Mini API tests', () => {
  // Avant les tests, démarrer le serveur sur un port aléatoire
  beforeAll(done => {
    server.listen(0, done);
  });

  // Après les tests, fermer le serveur
  afterAll(done => {
    server.close(done);
  });

  test('GET / doit retourner un message de bienvenue', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Bienvenue');
  });

  test('GET /api/v1/sysinfo doit retourner un JSON valide', async () => {
    const response = await request(server).get('/api/v1/sysinfo');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    const data = JSON.parse(response.text);
    expect(data).toHaveProperty('hostname');
    expect(data).toHaveProperty('platform');
    expect(data).toHaveProperty('nodeVersion');
  });

  test('GET /route/inconnue doit retourner 404', async () => {
    const response = await request(server).get('/route/inconnue');
    expect(response.status).toBe(404);
  });
});
