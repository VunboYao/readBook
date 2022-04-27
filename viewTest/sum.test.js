const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  expect(value).toBe(4)
  expect(value).toEqual(4)
})

test('两个浮点数之和', () => {
  const value = 0.1 + 0.2
  expect(value).toBeCloseTo(0.3)
})

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk'
]
test('shoppingList includes milk', () => {
  expect(shoppingList).toContain('milk')
  expect(new Set(shoppingList)).toContain('milk')
})

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK')
}
test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode().toThrow())
  expect(() => compileAndroidCode().toThrow(Error))

  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK')
  expect(() => compileAndroidCode()).toThrow(/JDK/)
})

function fetchData() {
  return new Promise(resolve => {
    resolve('good')
  })
}
test('the data is peaut butter', async () => {
  /* return fetchData().then(data => {
    expect(data).toBe('good')
  }) */
  const data = await fetchData()
  expect(data).toBe('good')
})
test('the data is good', async () => {
  await expect(fetchData()).resolves.toBe('good')
})

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index])
  }
}

const mockCallback = jest.fn(x => 42 + x)
forEach([0, 1], mockCallback)

expect(mockCallback.mock.calls.length).toBe(2)
