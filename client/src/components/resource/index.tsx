import React from 'react'
import styled from 'styled-components/macro'
import Title from './title'
import Excerpt from './excerpt'
import Tags from './tags'
import { Resource } from '../../interfaces'

const Wrapper = styled.div`
  display: flex;
  height: auto;
  background-color: ${(props) => props.theme.foreground};
  flex: 1;
  flex-direction: column;
  border-left: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  min-width: 0;
`

const ResourceContent = (props: Resource) => {
  const { href, title, subtitle, tags, excerpts } = props

  return (
    <Wrapper>
      <Title href={href} title={title} subtitle={subtitle} />
      {excerpts && excerpts.length
        ? excerpts.map((text: string, i: number) => (
            <Excerpt key={i}>{text}</Excerpt>
          ))
        : null}
      <Tags tags={tags} />
    </Wrapper>
  )
}

export default ResourceContent
