/* eslint-env jest */

import { uniq } from './db'

describe('db', () => {
  test('uniq', () => {
    expect(uniq([1, 2, 1])).toStrictEqual([1, 2])
    expect(uniq(['a', 'b'])).toStrictEqual(['a', 'b'])
  })
})
