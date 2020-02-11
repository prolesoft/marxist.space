/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from './component'
import SidebarTagList from './tag-list'

it('renders without crashing', () => {
  shallow(<Sidebar />)
})

it('renders a list of tags', () => {
  const wrapper = shallow(<Sidebar />)
  expect(wrapper.contains(<SidebarTagList />)).toEqual(true)
})
