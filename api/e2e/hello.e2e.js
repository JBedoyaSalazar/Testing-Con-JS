const request = require('supertest');

const createApp = require('../src/app');

describe('Test for Hello end point', () => {
  beforeAll(() => {
    app = createApp();
  })
});
