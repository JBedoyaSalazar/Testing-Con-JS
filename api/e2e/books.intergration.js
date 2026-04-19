const request = require('supertest');
const { generateManyBook } = require('../src/fakes/book.fake');
const createApp = require('../src/app');

const MongoLib = require('../src/lib/mongo.lib');
const mockGetAll = jest.fn();
const mockCreate = jest.fn();

MongoLib.prototype.getAll = mockGetAll;
MongoLib.prototype.create = mockCreate;

const setupMockBooks = (quantity = 20) => {
  const fakeBooks = generateManyBook(quantity);
  mockGetAll.mockResolvedValue(fakeBooks);
  return fakeBooks;
};

describe('Books Endpoint', () => {
  let app;
  let server;

  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/books', () => {
    test('should return a list of books', async () => {
      setupMockBooks(20);

      const response = await request(app)
        .get('/api/v1/books')
        .expect(200);

      expect(response.body.length).toBe(20);
      expect(mockGetAll).toHaveBeenCalled();
    });
  });
});
