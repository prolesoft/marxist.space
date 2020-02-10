/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import PostList from './component'
import PostListItem from './item'
import Empty from '../shared/empty'
import LoadingIndicatorBox from '../shared/loading-indicator/box'

it('renders without crashing', () => {
  // @ts-ignore
  shallow(<PostList fetchPosts={(fn) => fn} />)
})

it('renders a list of posts', () => {
  const posts = [{}, {}, {}]
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} posts={posts} />)
  expect(wrapper.children()).toHaveLength(posts.length)
  expect(wrapper.contains(<PostListItem />)).toEqual(true)
})

it('renders a loading indicator while fetching', () => {
  // @ts-ignore
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} isFetching />)
  expect(wrapper.contains(<LoadingIndicatorBox />)).toEqual(true)
})

it('renders a message when there are no posts', () => {
  // @ts-ignore
  const wrapper = shallow(<PostList fetchPosts={(fn) => fn} />)
  expect(wrapper.contains(<Empty />)).toEqual(true)
})
