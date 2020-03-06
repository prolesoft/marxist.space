/* eslint-env jest */

import * as React from 'react'
import Item from './item'
import { create } from 'react-test-renderer'

describe('Item', () => {
  test('renders', () => {
    expect(create(<Item />).toJSON()).toMatchSnapshot()
  })
})
