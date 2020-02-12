import React from 'react'
import styled from 'styled-components/macro'
import ResourceContent from './content'

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
`

const Resource = ({ id, full, ...content }) => (
  <Wrapper>
    <ResourceContent showFullResource={full} id={id} {...content} />
  </Wrapper>
)

export default Resource
