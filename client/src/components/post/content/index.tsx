import React from 'react'
import styled from 'styled-components/macro'
import PostContentTitle from './title'
import PostContentPreview from './preview'
import PostContentFullText from './full-text'
import PostContentDetail from './detail'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  min-width: 0;
`

const renderContent = (props) => {
  switch (props.type) {
    case 'link':
      return <PostContentPreview>{props.url}</PostContentPreview>

    case 'text':
      if (props.showFullPost) {
        return <PostContentFullText>{props.text}</PostContentFullText>
      }
      return <PostContentPreview>{props.text}</PostContentPreview>

    default:
      break
  }
}

const PostContent = ({
  url,
  title,
  type,
  text,
  showFullPost,
  ...details
}) => (
  <Wrapper>
    <PostContentTitle
      url={url}
      title={title}
      type={type}
      full={showFullPost}
      {...details}
    />
    {renderContent({ type, url, text, showFullPost })}
    <PostContentDetail {...details} />
  </Wrapper>
)

export default PostContent
