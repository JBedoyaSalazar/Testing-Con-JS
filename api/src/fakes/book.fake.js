const faker = require('faker');

const generateOneBook = () => ({
  _id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  pice: faker.commerce.price(),
});

const generateManyBook = (size) => {
  const limit = size ?? 10;
  const fakeBooks = [];
  for (let i = 0; i < limit; i++) {
    fakeBooks.push(generateOneBook());
  }

  return [...fakeBooks];
};

module.exports = { generateOneBook, generateManyBook };
