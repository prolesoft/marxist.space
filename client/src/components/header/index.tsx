import * as React from 'react'
import styled from 'styled-components/macro'
import HeaderLogo from './logo'
import DarkButton from './dark-button'
import HeaderNavLink from './nav-link'
import Search from '../search'
import Button from '../shared/button'
import { headerItem } from '../shared/helpers'

const scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

const JumpButton = styled(Button)`
  ${headerItem}

  background: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.normalText};

  cursor: pointer;
  @media (min-width: 600px) {
    display: none;
  }
`

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  border-bottom: 1px solid ${(props) => props.theme.border};
  height: 48px;
  background-color: ${(props) => props.theme.foreground};
  user-select: none;

  @media (max-width: 600px) {
    margin-bottom: 16px;
    height: 40px;
  }
`

const Header = () => (
  <Wrapper>
    <HeaderLogo />
    <Search header />
    <JumpButton title="Search and filter" onClick={scrollToBottom}>
      &#x1F50E;
    </JumpButton>
    <DarkButton />
    <HeaderNavLink to="/about">About</HeaderNavLink>
  </Wrapper>
)

export default Header
