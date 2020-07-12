import * as React from 'react'
import styled from 'styled-components/macro'
import Resource from '../resource'

const Item = styled.li`
  :not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.border};
  }
`

const ResourceListItem = (props) => (
  <Item>
    <Resource {...props} />
  </Item>
)

export default ResourceListItem
