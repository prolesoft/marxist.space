import React from 'react'
import styled from 'styled-components/macro'
import ResourceContent from './content'

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
`

const Resource = (props) => (
  <Wrapper>
    <ResourceContent {...props} />
  </Wrapper>
)

export default Resource
