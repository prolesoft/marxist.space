/* eslint-env jest */

import * as themeActions from './theme'

describe('theme actions', () => {
  test('toggleDarkTheme', () => {
    expect(themeActions.toggleDarkTheme()).toMatchSnapshot()
  })
})
