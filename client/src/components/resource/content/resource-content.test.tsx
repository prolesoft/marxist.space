/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ResourceContent from '.'
import ResourceContentTitle from './title'
import ResourceContentPreview from './preview'
import ResourceContentDetail from './detail'
import ResourceContentFullText from './full-text'

it('renders without crashing', () => {
  shallow(<ResourceContent />)
})

it("renders the resource's title, content preview, and details", () => {
  const wrapper = shallow(<ResourceContent type="link" />)
  expect(wrapper.find(ResourceContentTitle).exists()).toEqual(true)
  expect(wrapper.find(ResourceContentPreview).exists()).toEqual(true)
  expect(wrapper.contains(<ResourceContentDetail />)).toEqual(true)
})

it('renders the full text of a text resource', () => {
  const text = 'example test resource'
  const wrapper = shallow(<ResourceContent type="text" text={text} showFullResource />)
  expect(wrapper.find(ResourceContentFullText).exists()).toEqual(true)
  expect(
    wrapper
      .find(ResourceContentFullText)
      .children()
      .text()
  ).toEqual(text)
})
