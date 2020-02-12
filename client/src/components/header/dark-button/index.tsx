import React from 'react'
import styled from 'styled-components/macro'
import { headerItem } from '../../shared/helpers'
import { connect } from 'react-redux'
import { toggleDarkTheme } from '../../../actions/theme'
import HeaderDarkButtonIcon from './icon'

const DarkButton = styled.span`
  ${headerItem};

  padding: 0 8px;
  cursor: pointer;

  @media (hover: hover) {
    :hover path {
      fill: ${(props) => props.theme.accent};
    }
  }
`

export const HeaderDarkButton = (props) => (
  <DarkButton onClick={props.toggleDarkTheme}>
    <HeaderDarkButtonIcon />
  </DarkButton>
)

const mapDispatchToProps = { toggleDarkTheme }

export default connect(
  null,
  mapDispatchToProps
)(HeaderDarkButton)
