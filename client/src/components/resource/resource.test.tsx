/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Resource from '.'
import ResourceContent from './content'

it('renders without crashing', () => {
  // @ts-ignore
  shallow(<Resource />)
})

it('renders information about the resource', () => {
  // @ts-ignore
  const wrapper = shallow(<Resource />)
  expect(wrapper.contains(<ResourceContent />)).toEqual(true)
})
