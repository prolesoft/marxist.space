/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import ResourceDetail from './component'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import ResourceDetailResource from './resource'
import Empty from '../shared/empty'

it('renders without crashing', () => {
  shallow(<ResourceDetail fetchResource={(fn) => fn} />)
})

it('renders a resource', () => {
  const wrapper = shallow(<ResourceDetail fetchResource={(fn) => fn} resource />)
  expect(wrapper.contains(<ResourceDetailResource />)).toEqual(true)
})

it('renders a loading indicator while fetching', () => {
  const wrapper = shallow(<ResourceDetail fetchResource={(fn) => fn} isFetching />)
  expect(wrapper.contains(<LoadingIndicatorBox />)).toEqual(true)
})

it("renders a message when the resource doesn't exist", () => {
  const wrapper = shallow(<ResourceDetail fetchResource={(fn) => fn} />)
  expect(wrapper.contains(<Empty />)).toEqual(true)
})
