import { getQueryParams } from './search'

describe('getQueryParams', () => {
  it('returns empty obj without location.search', () => {
    expect(getQueryParams()).toEqual({})
  })

  it('returns the params in an object', () => {
    expect(getQueryParams('?foo=bar&baz=qux')).toEqual({
      foo: 'bar',
      baz: 'qux',
    })
  })
})
