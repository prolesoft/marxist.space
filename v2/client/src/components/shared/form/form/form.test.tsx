/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Form from '.'

it('renders without crashing', () => {
  // @ts-ignore
  shallow(<Form />)
})

it('renders a loading indicator', () => {
  // @ts-ignore
  const wrapper = shallow(<Form loading />)
  expect(wrapper.find('Spinner__LoadingIndicatorSpinner')).toHaveLength(1)
})
