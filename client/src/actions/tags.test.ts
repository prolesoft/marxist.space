/* eslint-env jest */

import * as tagsActions from './tags'

describe('tags actions', () => {
  test('fetchTagsRequest', () => {
    expect(tagsActions.fetchTagsRequest).toMatchSnapshot()
  })

  test('fetchTagsSuccess', () => {
    expect(tagsActions.fetchTagsSuccess(['one', 'two'])).toMatchSnapshot()
  })

  test('fetchTagsError', () => {
    expect(tagsActions.fetchTagsError('oh no')).toMatchSnapshot()
  })
})
