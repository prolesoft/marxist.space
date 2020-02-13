import React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import TagMenuDropdown from './dropdown'

const Menu = styled.nav`
  display: none;
  border: 1px solid ${(props) => props.theme.border};
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`

const TagMenu = () => (
  <Menu>
    <Route
      path="/a/:tag"
      children={({ match, history }) => (
        <TagMenuDropdown
          // @ts-ignore
          tag={match ? match.params.tag : 'all'}
          history={history}
        />
      )}
    />
  </Menu>
)

export default TagMenu
