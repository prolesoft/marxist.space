/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import PostDetailInfoBar from './component'

it('renders without crashing', () => {
  shallow(<PostDetailInfoBar />)
})

it('renders the information correctly', () => {
  const data = {
    views: 10,
  }

  const wrapper = shallow(<PostDetailInfoBar {...data} />)
  const details = wrapper.find('span')

  expect(details.at(0).text()).toEqual(`${data.views} views`)
})
