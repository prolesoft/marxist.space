/* eslint-env jest */

import * as errorActions from './error'

describe('error actions', () => {
  test('showError', () => {
    expect(errorActions.showError('oh no')).toMatchSnapshot()
  })

  test('hideError', () => {
    expect(errorActions.hideError()).toMatchSnapshot()
  })
})
