const { sum, multiply, divide, calculateTotalToPay } = require('./02-math');

describe('Test for math', () => {
  describe('sum', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });

  describe('multiply', () => {
    test('multiplying 2 * 2 to equal 4', () => {
      expect(multiply(2, 2)).toBe(4);
    });
  });

  describe('divide', () => {
    test('should divide', () => {
      expect(divide(6, 2)).toBe(3);

      expect(divide(10, 2)).toBe(5);

      expect(divide(5, 2)).toBe(2.5);
    });

    test('should divide for 0', () => {
      expect(divide(6, 0)).toBe(null);

      expect(divide(10, 0)).toBe(null);

      expect(divide(5, 2)).toBe(2.5);
    });
  });

  describe('calculte total to pay', () => {
    test('Calculate total to pay', () => {
      expect(calculateTotalToPay(100, 105)).toBe(null);

      expect(calculateTotalToPay(100, 90)).toBe(10);

      expect(calculateTotalToPay(100, 100)).toBe(0);
    });
  });
});
