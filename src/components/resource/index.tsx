import * as React from 'react'
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
