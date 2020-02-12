/* eslint-env jest */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import ResourceContentDetail from './detail'

it('renders without crashing', () => {
  shallow(<ResourceContentDetail />)
})

it('renders the information correctly', () => {
  const data = {
    tag: 'tag',
  }

  const wrapper = mount(
    <MemoryRouter>
      <ResourceContentDetail {...data} />
    </MemoryRouter>
  )
  const links = wrapper.find('a')
  const timestamp = wrapper.find('span').at(1)

  expect(links.at(1).text()).toEqual(`/a/${data.tag}`)
})
