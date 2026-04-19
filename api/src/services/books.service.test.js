const BookService = require('./books.service');

const fakeBooks = [
  {
    _id: 1,
    name: 'Harry Potter',
  },
  {
    _id: 2,
    name: 'Habitos Atomicos',
  },
  {
    _id: 3,
    name: 'Club de las 5 AM',
  },
];

const spyGetAll = jest.fn();

const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => {},
};

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    service = new BookService();
    jest.clearAllMocks(); // Limpia el estado
  });

  describe('test for getBooks', () => {
    test('should return a book list', async () => {
      // Arrange

      // Act

      const books = await service.getBooks();
      // Assert
      expect(books[0].name).toEqual('Harry Potter');
    });
  });
});
