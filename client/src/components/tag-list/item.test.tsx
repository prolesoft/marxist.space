/* eslint-env jest */

import * as React from 'react'
import { TagItem } from './item'
import { create } from 'react-test-renderer'

describe('TagItem', () => {
  test('renders', () => {
    /* eslint-disable @typescript-eslint/no-empty-function */
    const props = {
      tag: 'one',
      set: () => {},
      clear: () => {},
      currentTags: ['two'],
      history: {
        push: () => {},
      },
      location: {
        search: '',
      },
    }
    /* eslint-enable @typescript-eslint/no-empty-function */

    expect(create(<TagItem {...props} />).toJSON()).toMatchSnapshot()
  })
})
