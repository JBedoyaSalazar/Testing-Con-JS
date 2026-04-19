const request = require('supertest');

const createApp = require('../src/app');

describe('Hello Endpoint', () => {
  let app;
  let server;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /', () => {
    test('should return 200 status with "Hello World!" message', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });
  });
});
