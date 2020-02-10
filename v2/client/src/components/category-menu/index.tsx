import React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import CategoryMenuDropdown from './dropdown'

const Menu = styled.nav`
  display: none;
  border: 1px solid ${(props) => props.theme.border};
  border-left: none;
  border-right: none;

  @media (max-width: 768px) {
    display: flex;
  }
`

const CategoryMenu = (props) => (
  <Menu>
    <Route
      path="/a/:category"
      children={({ match, history }) => (
        <CategoryMenuDropdown
          // @ts-ignore
          category={match ? match.params.category : 'all'}
          history={history}
        />
      )}
    />
  </Menu>
)

export default CategoryMenu
