describe('Set', () => {
  beforeAll(() => {
    console.log('beforeAll');
  });

  test('case 1', () => {
    expect(1 + 1).toBe(2);
  });

  test('case 2', () => {
    expect(2 + 2).toBe(4);
  });

  describe('other group', () => {
    test('case 3', () => {
      expect(1 * 1).toBe(1);
    });

    test('case 4', () => {
      expect(2 * 2).toBe(4);
    });
  });
});
