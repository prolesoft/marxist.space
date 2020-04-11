/* eslint-env jest */

import * as React from 'react'
import Collapse from './collapse'
import { create } from 'react-test-renderer'

describe('Collapse', () => {
  test('renders', () => {
    expect(
      create(
        <Collapse title="asdf">
          <span>hello</span>
        </Collapse>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
