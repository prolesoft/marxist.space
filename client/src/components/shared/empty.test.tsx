/* eslint-env jest */

import * as React from 'react'
import Empty from './empty'
import { create } from 'react-test-renderer'

describe('Empty', () => {
  test('renders', () => {
    expect(create(<Empty />).toJSON()).toMatchSnapshot()
  })
})
