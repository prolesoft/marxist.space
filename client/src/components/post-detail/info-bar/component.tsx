import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: flex;
  margin-top: -1px;
  border: 1px solid ${(props) => props.theme.border};
  ${(props) => props.round && 'border-radius: 0 0 2px 2px'};
  padding: 8px;
  background-color: ${(props) => props.theme.foreground};
  font-size: 13px;
  color: ${(props) => props.theme.mutedText};

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
  }
`

const PostDetailInfoBar = ({ views }) => (
  <Wrapper>
    <span>{views} views</span>
    <span>&nbsp;|&nbsp;</span>
  </Wrapper>
)

export default PostDetailInfoBar
