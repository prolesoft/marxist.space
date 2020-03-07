/* eslint-env jest */

import * as React from 'react'
import Icon from './icon'
import { create } from 'react-test-renderer'

describe('Icon', () => {
  test('renders', () => {
    expect(create(<Icon />).toJSON()).toMatchSnapshot()
  })
})
