import React from 'react'
import styled from 'styled-components/macro'
import PostContent from './content'

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
`

const Post = ({ id, full, ...content }) => (
  <Wrapper>
    <PostContent
      showFullPost={full}
      id={id}
      {...content}
    />
  </Wrapper>
)

export default Post
