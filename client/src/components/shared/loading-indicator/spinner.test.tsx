/* eslint-env jest */

import * as React from 'react'
import Spinner from './spinner'
import { create } from 'react-test-renderer'

describe('Spinner', () => {
  test('renders', () => {
    expect(create(<Spinner />).toJSON()).toMatchSnapshot()
  })
})
