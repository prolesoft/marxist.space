import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  font-size: 12px;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > * {
    margin-right: 4px;
  }

  & > span {
    color: ${(props) => props.theme.mutedText};
  }
`

type Props = {
  tags: string[]
}

const Tags = (props: Props) => (
  <Wrapper>
    <span>Tags: {props.tags.join(' ')}</span>
  </Wrapper>
)

export default Tags
