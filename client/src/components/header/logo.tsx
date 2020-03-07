import * as React from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { headerItem } from '../shared/helpers'

const Logo = styled(Link)`
  ${headerItem};

  margin-right: auto;
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.normalText};
  text-decoration: none;

  @media (max-width: 425px) {
    font-size: 12px;
    margin: 0;
  }
`

const HeaderLogo = () => <Logo to="/">marxist.space</Logo>

export default HeaderLogo
