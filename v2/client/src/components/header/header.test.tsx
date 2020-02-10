/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Header from './component'
import HeaderLogo from './logo'
import HeaderDarkButtonContainer from './dark-button/container'

it('renders without crashing', () => {
  shallow(<Header />)
})

it('renders a logo link', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper.contains(<HeaderLogo />)).toEqual(true)
})

it('renders a dark mode toggle button', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper.contains(<HeaderDarkButtonContainer />)).toEqual(true)
})
