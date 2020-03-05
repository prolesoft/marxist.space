import React from 'react'
import styled from 'styled-components/macro'
import { connect } from 'react-redux'
import { setTag, clearTags } from '../../actions/filter-search'

const Item = styled.span`
  padding: 6px;
  font-size: 15px;
  text-decoration: none;
  color: ${(props) => props.theme.normalText};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  cursor: pointer;
  text-decoration: underline;

  ::after {
    left: -1px;
    top: 0;
    bottom: 0;
    border-left: 3px solid ${(props) => props.theme.accent};
  }
`

type TagItemProps = {
  tag: string
  set: (tag: string) => void
  clear: () => void
  currentTags: string[]
}

const TagItem = ({ tag, set, clear, currentTags }: TagItemProps) => {
  const handleClick = tag === 'all' ? clear : () => set(tag)
  const isActive = currentTags.includes(tag)
  return (
    <Item isActive={isActive} onClick={handleClick}>
      {tag}
    </Item>
  )
}

const mapStateToProps = (state) => ({
  currentTags: state.filterSearch.tags,
})

const mapDispatchToProps = { set: setTag, clear: clearTags }

export default connect(mapStateToProps, mapDispatchToProps)(TagItem)
