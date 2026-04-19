const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

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

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia el estado
    service = new BookService();
  });

  describe('test for getBooks', () => {
    test('Should return a book list', async () => {
      // Arrange
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      expect(books.length).toEqual(3);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a book list', async () => {
      // Arrange
      mockGetAll.mockResolvedValue([{
        _id: 1,
        name: 'Harry Potter 2',
      }]);
      // Act
      const books = await service.getBooks();
      // Assert
      expect(books[0].name).toEqual('Harry Potter 2');
    });
  });
});
