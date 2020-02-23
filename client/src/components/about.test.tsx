/* eslint-env jest */

import * as React from 'react'
import About from './about'
import { create } from 'react-test-renderer'

describe('about', () => {
  test('renders', () => {
    expect(create(<About />).toJSON()).toMatchSnapshot()
  })
})
