import React from 'react'
import styled from 'styled-components/macro'

const Span = styled.span`
  font-size: 12px;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.mutedText};
`

type Props = {
  tags: string[]
}

const Tags = (props: Props) => <Span>Tags: {props.tags.join(' ')}</Span>

export default Tags
