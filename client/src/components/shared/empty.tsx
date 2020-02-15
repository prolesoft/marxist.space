import React from 'react'
import styled from 'styled-components/macro'
import { smallFont } from '../shared/helpers'

const Wrapper = styled.div`
  ${smallFont};

  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  padding: 48px 0;
  background-color: ${(props) => props.theme.foreground};
  text-align: center;
  color: ${(props) => props.theme.mutedText};

  @media (max-width: 768px) {
    margin-top: -1px';
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`

const Empty = () => <Wrapper>There's nothing here</Wrapper>

export default Empty
