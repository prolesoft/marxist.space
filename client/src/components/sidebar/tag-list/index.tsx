import React from 'react'
import styled from 'styled-components/macro'
import SidebarTagListItem from './item'
import SidebarTagListHeader from './header'
import tags from '../../../tags'

const TagList = styled.nav`
  display: flex;
  flex-direction: column;
`

const mapTags = (tags) =>
  tags.map((tag, index) => (
    <SidebarTagListItem key={index} tag={tag} />
  ))

const SidebarTagList = () => (
  <TagList>
    <SidebarTagListHeader />
    {mapTags(['all', ...tags])}
  </TagList>
)

export default SidebarTagList
