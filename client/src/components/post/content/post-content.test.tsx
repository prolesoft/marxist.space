/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import PostContent from '.'
import PostContentTitle from './title'
import PostContentPreview from './preview'
import PostContentDetail from './detail'
import PostContentFullText from './full-text'

it('renders without crashing', () => {
  shallow(<PostContent />)
})

it("renders the post's title, content preview, and details", () => {
  const wrapper = shallow(<PostContent type="link" />)
  expect(wrapper.find(PostContentTitle).exists()).toEqual(true)
  expect(wrapper.find(PostContentPreview).exists()).toEqual(true)
  expect(wrapper.contains(<PostContentDetail />)).toEqual(true)
})

it('renders the full text of a text post', () => {
  const text = 'example test post'
  const wrapper = shallow(<PostContent type="text" text={text} showFullPost />)
  expect(wrapper.find(PostContentFullText).exists()).toEqual(true)
  expect(
    wrapper
      .find(PostContentFullText)
      .children()
      .text()
  ).toEqual(text)
})
