/* eslint-env jest */

import * as React from 'react'
import { HeaderDarkButton } from '.'
import { create } from 'react-test-renderer'

describe('HeaderDarkButton', () => {
  test('renders', () => {
    expect(create(<HeaderDarkButton />).toJSON()).toMatchSnapshot()
  })
})
