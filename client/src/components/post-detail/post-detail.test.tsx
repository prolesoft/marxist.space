/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import PostDetail from './component'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import PostDetailPost from './post'
import Empty from '../shared/empty'

it('renders without crashing', () => {
  shallow(<PostDetail fetchPost={(fn) => fn} />)
})

it('renders a post', () => {
  const wrapper = shallow(<PostDetail fetchPost={(fn) => fn} post />)
  expect(wrapper.contains(<PostDetailPost />)).toEqual(true)
})

it('renders a loading indicator while fetching', () => {
  const wrapper = shallow(<PostDetail fetchPost={(fn) => fn} isFetching />)
  expect(wrapper.contains(<LoadingIndicatorBox />)).toEqual(true)
})

it("renders a message when the post doesn't exist", () => {
  const wrapper = shallow(<PostDetail fetchPost={(fn) => fn} />)
  expect(wrapper.contains(<Empty />)).toEqual(true)
})
