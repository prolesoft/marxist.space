/* eslint-env jest */

import * as React from 'react'
import About from './about'
import { mount } from 'enzyme'

describe('about', () => {
  test('renders', () => {
    expect(mount(<About />)).toMatchSnapshot()
  })
})
