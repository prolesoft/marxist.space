/* eslint-env jest */

import * as React from 'react'
import Item from './item'
import { create } from 'react-test-renderer'

describe('Item', () => {
  test('renders', () => {
    const props = {
      href: 'https://example.com',
      title: 'foo',
      tags: ['one', 'two'],
      subtitle: 'asdf',
      excerpts: ['one', 'two', 'three'],
    }
    expect(create(<Item {...props} />).toJSON()).toMatchSnapshot()
  })
})
