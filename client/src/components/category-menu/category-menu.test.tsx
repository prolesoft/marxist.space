/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import CategoryMenu from './component'

it('renders without crashing', () => {
  shallow(<CategoryMenu />)
})
