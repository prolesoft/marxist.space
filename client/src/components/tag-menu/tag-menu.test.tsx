/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import TagMenu from './component'

it('renders without crashing', () => {
  shallow(<TagMenu />)
})
