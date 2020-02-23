/* eslint-env jest */

import { uniq, addPlurals, addTagAliases } from './util'

describe('util', () => {
  test('uniq', () => {
    expect(uniq([1, 2, 1])).toMatchSnapshot()
    expect(uniq(['a', 'b'])).toMatchSnapshot()
  })

  test('addPlurals', () => {
    const tags = ['trot', 'library', 'documentary', 'people']
    expect(addPlurals(tags)).toMatchSnapshot()
  })

  test('addTagAliases', () => {
    const tags = ['abolition', 'israel', 'mao', 'essay']
    expect(addTagAliases(tags)).toMatchSnapshot()
  })
})
