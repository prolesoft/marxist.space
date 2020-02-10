/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from './component'
import SidebarCategoryList from './category-list'

it('renders without crashing', () => {
  shallow(<Sidebar />)
})

it('renders a list of categories', () => {
  const wrapper = shallow(<Sidebar />)
  expect(wrapper.contains(<SidebarCategoryList />)).toEqual(true)
})
