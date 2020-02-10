/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Home from '.'

it('renders without crashing', () => {
  shallow(<Home />)
})
