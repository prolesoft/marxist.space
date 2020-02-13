/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ResourceList from './component'
import ResourceListItem from './item'
import Empty from '../shared/empty'
import LoadingIndicatorBox from '../shared/loading-indicator/box'

it('renders without crashing', () => {
  // @ts-ignore
  shallow(<ResourceList fetchResources={(fn) => fn} />)
})

it('renders a list of resources', () => {
  const resources = [{}, {}, {}]
  const wrapper = shallow(
    <ResourceList fetchResources={(fn) => fn} resources={resources} />
  )
  expect(wrapper.children()).toHaveLength(resources.length)
  expect(wrapper.contains(<ResourceListItem />)).toEqual(true)
})

it('renders a loading indicator while fetching', () => {
  // @ts-ignore
  const wrapper = shallow(
    <ResourceList fetchResources={(fn) => fn} isFetching />
  )
  expect(wrapper.contains(<LoadingIndicatorBox />)).toEqual(true)
})

it('renders a message when there are no resources', () => {
  // @ts-ignore
  const wrapper = shallow(<ResourceList fetchResources={(fn) => fn} />)
  expect(wrapper.contains(<Empty />)).toEqual(true)
})
