/* eslint-env jest */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import moment from 'moment'
import PostContentDetail from './detail'

it('renders without crashing', () => {
  shallow(<PostContentDetail />)
})

it('renders the information correctly', () => {
  const data = {
    tag: 'tag',
    created: '2018-11-05T05:02:38.544Z',
  }

  const wrapper = mount(
    <MemoryRouter>
      <PostContentDetail {...data} />
    </MemoryRouter>
  )
  const links = wrapper.find('a')
  const timestamp = wrapper.find('span').at(1)

  expect(links.at(1).text()).toEqual(`/a/${data.tag}`)
  expect(timestamp.text()).toEqual(moment(data.created).fromNow())
})
