import * as React from 'react'
// import { lazyload } from 'react-lazyload'
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

/*
// approximate height of a resource item with no description
const resourceHeight = 51

// @ts-ignore types on this may be incorrect
@lazyload({
  height: resourceHeight,
  offset: resourceHeight * 4,
})
 */
export default class ResourceItem extends React.Component<Resource> {
  render() {
    const { href, title, description, tags, excerpts } = this.props

    return (
      <Wrapper>
        <Title href={href} title={title} description={description} />
        {excerpts && excerpts.length
          ? excerpts.map((text: string, i: number) => (
              <Excerpt key={i}>{text}</Excerpt>
            ))
          : null}
        <Tags tags={tags} />
      </Wrapper>
    )
  }
}
