import * as React from 'react'
import styled from 'styled-components/macro'
import HeaderLogo from './logo'

const Wrapper = styled.header`
  position: sticky;
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
    display: none;
    margin-bottom: 16px;
    height: 40px;
  }
`

const Header = () => (
  <Wrapper>
    <HeaderLogo />
  </Wrapper>
)

export default Header
