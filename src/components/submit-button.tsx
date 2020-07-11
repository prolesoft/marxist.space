import styled from 'styled-components/macro'
import Button from './shared/button'
import { headerItem } from './shared/helpers'

const SubmitButton = styled(Button)`
  ${headerItem};
  cursor: pointer;

  background: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.normalText};

  @media (hover: hover) {
    :hover path {
      fill: ${(props) => props.theme.accent};
    }
  }
`

export default SubmitButton
