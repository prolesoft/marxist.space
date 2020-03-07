/* eslint-env jest */

import * as resourcesActions from './resources'

describe('resources actions', () => {
  test('fetchResourcesRequest', () => {
    expect(resourcesActions.fetchResourcesRequest).toMatchSnapshot()
  })

  test('fetchResourcesSuccess', () => {
    expect(
      resourcesActions.fetchResourcesSuccess(['one', 'two'])
    ).toMatchSnapshot()
  })

  test('fetchResourcesError', () => {
    expect(resourcesActions.fetchResourcesError('oh no')).toMatchSnapshot()
  })

  test('filterResourcesRequest', () => {
    expect(resourcesActions.filterResourcesRequest(['one'])).toMatchSnapshot()
  })

  test('filterResourcesSuccess', () => {
    expect(
      resourcesActions.filterResourcesSuccess(['one', 'two'])
    ).toMatchSnapshot()
  })

  test('filterResourcesError', () => {
    expect(resourcesActions.filterResourcesError('oh no')).toMatchSnapshot()
  })

  test('searchResourcesRequest', () => {
    expect(resourcesActions.searchResourcesRequest('one')).toMatchSnapshot()
  })

  test('searchResourcesSuccess', () => {
    expect(
      resourcesActions.searchResourcesSuccess(['one', 'two'])
    ).toMatchSnapshot()
  })

  test('searchResourcesError', () => {
    expect(resourcesActions.searchResourcesError('oh no')).toMatchSnapshot()
  })
})
