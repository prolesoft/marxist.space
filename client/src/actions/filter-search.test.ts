/* eslint-env jest */

import * as filterSearchActions from './filter-search'

describe('filterSearch actions', () => {
  test('setTagAction', () => {
    expect(filterSearchActions.setTagAction('one')).toMatchSnapshot()
  })

  test('clearTagsAction', () => {
    expect(filterSearchActions.clearTagsAction()).toMatchSnapshot()
  })

  test('setSearchAction', () => {
    expect(filterSearchActions.setSearchAction('one')).toMatchSnapshot()
  })

  test('clearSearchAction', () => {
    expect(filterSearchActions.clearSearchAction()).toMatchSnapshot()
  })
})
