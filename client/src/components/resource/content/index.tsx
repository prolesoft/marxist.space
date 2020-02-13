import React from 'react'
import styled from 'styled-components/macro'
import ResourceContentTitle from './title'
import ResourceContentPreview from './preview'
import ResourceContentFullText from './full-text'
import ResourceContentDetail from './detail'

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
      return <ResourceContentPreview>{props.href}</ResourceContentPreview>

    case 'text':
      if (props.showFullResource) {
        return <ResourceContentFullText>{props.text}</ResourceContentFullText>
      }
      return <ResourceContentPreview>{props.text}</ResourceContentPreview>

    default:
      return <ResourceContentPreview>{props.title}</ResourceContentPreview>
  }
}

const ResourceContent = ({
  href,
  title,
  type,
  text,
  showFullResource,
  ...details
}) => (
  <Wrapper>
    <ResourceContentTitle
      href={href}
      title={title}
      type={type}
      full={showFullResource}
      {...details}
    />
    {renderContent({ type, href, text, showFullResource })}
    <ResourceContentDetail {...details} />
  </Wrapper>
)

export default ResourceContent
