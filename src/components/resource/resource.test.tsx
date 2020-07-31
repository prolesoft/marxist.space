/* eslint-env jest */

import * as React from 'react'
import Resource from '.'
import { create } from 'react-test-renderer'

describe('resource', () => {
  test('renders with minimum props', () => {
    const props = {
      href: 'https://marxist.space',
      title: 'marxist.space',
      tags: ['links', 'collection'],
    }
    expect(create(<Resource {...props} />).toJSON()).toMatchSnapshot()
  })

  test('renders with all props', () => {
    const props = {
      href: 'https://marxist.space',
      title: 'marxist.space',
      tags: ['links', 'collection'],
      description: 'Links for you!',
    }
    expect(create(<Resource {...props} />).toJSON()).toMatchSnapshot()
  })
})
