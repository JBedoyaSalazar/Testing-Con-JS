const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

const { generateManyBook } = require('../fakes/book.fake');
const BookService = require('./books.service');

describe('Test for BooksService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia el estado
    service = new BookService();
  });

  describe('test for getBooks', () => {
    test('Should return a book list', async () => {
      // Arrange
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      expect(books.length).toEqual(fakeBooks.length);
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith('books', {});
    });

    test('should return a book list', async () => {
      // Arrange
      const fakeBooks = generateManyBook(4);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      // Assert
      expect(books[0].name).toEqual(fakeBooks[0].name);
    });
  });
});
