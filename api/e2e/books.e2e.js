const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URL = config.dbUrl;
const BOOKS_COLLECTION = 'books';

describe('Books Endpoint', () => {
  let app;
  let server;
  let client;
  let dataBase;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);

    client = new MongoClient(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    dataBase = client.db(DB_NAME);
  });

  afterAll(async () => {
    if (dataBase) {
      await dataBase.collection(BOOKS_COLLECTION).deleteMany({});
    }
    if (client) {
      await client.close();
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  beforeEach(async () => {
    await dataBase.collection(BOOKS_COLLECTION).deleteMany({});
    jest.clearAllMocks();
  });

  describe('GET /api/v1/books', () => {
    test('should return a list of books from the testing database', async () => {
      const books = [
        {
          name: 'Book 1',
          year: 2014,
          author: 'Miguel',
        },
        {
          name: 'Book 2',
          year: 2015,
          author: 'Manuel',
        },
      ];

      await dataBase.collection(BOOKS_COLLECTION).insertMany(books);

      const response = await request(app)
        .get('/api/v1/books')
        .expect(200);

      expect(response.body).toHaveLength(books.length);
      expect(response.body[0]).toEqual(expect.objectContaining({
        name: books[0].name,
        year: books[0].year,
        author: books[0].author,
      }));
      expect(response.body[1]).toEqual(expect.objectContaining({
        name: books[1].name,
        year: books[1].year,
        author: books[1].author,
      }));
    });

    test('should return an empty array when there are no books', async () => {
      const response = await request(app)
        .get('/api/v1/books')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/v1/books', () => {
    test('should create a book and persist it in the testing database', async () => {
      const newBook = {
        name: 'Clean Testing',
        year: 2024,
        author: 'Ada Lovelace',
      };

      const response = await request(app)
        .post('/api/v1/books')
        .send(newBook)
        .expect(201);

      expect(response.body).toEqual(
        expect.objectContaining(newBook)
      );
      expect(response.body._id).toBeDefined();

      const createdBook = await dataBase
        .collection(BOOKS_COLLECTION)
        .findOne(newBook);

      expect(createdBook).toEqual(
        expect.objectContaining(newBook)
      );
    });
  });
});
