import * as React from 'react'
// import { lazyload } from 'react-lazyload'
import styled from 'styled-components/macro'
import Title from './title'
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
  margin-bottom: 8px;
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
    const { href, title, description, tags } = this.props

    return (
      <Wrapper>
        <Title href={href} title={title} description={description} />
        <Tags tags={tags} />
      </Wrapper>
    )
  }
}
