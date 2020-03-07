/* eslint-env jest */

import * as React from 'react'
import Button from './empty'
import { create } from 'react-test-renderer'

describe('Button', () => {
  test('renders', () => {
    // @ts-ignore
    expect(create(<Button>hello</Button>).toJSON()).toMatchSnapshot()
  })
})
