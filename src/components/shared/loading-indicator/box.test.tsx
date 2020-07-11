/* eslint-env jest */

import * as React from 'react'
import Box from './box'
import { create } from 'react-test-renderer'

describe('Box', () => {
  test('renders', () => {
    expect(create(<Box />).toJSON()).toMatchSnapshot()
  })
})
