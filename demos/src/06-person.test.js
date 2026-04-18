const Person = require('./06-person')

describe('Test for person class', () => {

  let person

  beforeEach(() => {
    person = new Person('Jose 2', 59, 1.7)
  })

  test('should return down', () => {
    person.weight  = 45
    const imc = person.calcIMC()
    expect(imc).toBe('down')
  })

  test('should return normal', () => {
    person.weight = 59
    const imc = person.calcIMC()
    expect(imc).toBe('normal')
  })

})
