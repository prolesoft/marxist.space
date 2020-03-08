import styled from 'styled-components/macro'
import NavLink from '../shared/nav-link'
import { headerItem, wideFont } from '../shared/helpers'

const HeaderNavLink = styled(NavLink)`
  ${headerItem};
  ${wideFont};

  position: relative;
  cursor: pointer;
  color: ${(props) => props.theme.mutedText};

  ::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }

  :hover::after {
    opacity: 1;
  }

  &.active::after {
    left: 0;
    right: 0;
    bottom: 0;
  }

  padding-left: 8px;
  padding-right: 8px;
`

export default HeaderNavLink
