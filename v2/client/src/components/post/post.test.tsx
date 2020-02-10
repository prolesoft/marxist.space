/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Post from '.'
import PostContent from './content'

it('renders without crashing', () => {
  // @ts-ignore
  shallow(<Post />)
})

it('renders information about the post', () => {
  // @ts-ignore
  const wrapper = shallow(<Post />)
  expect(wrapper.contains(<PostContent />)).toEqual(true)
})
