import React from 'react'
import styled from 'styled-components/macro'
import TagItem from './item'
import { connect } from 'react-redux'
import { fetchTags } from '../../../actions/tags'

const TagListWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const mapTags = (tags) =>
  tags.map((tag, index) => <TagItem key={index} tag={tag} />)

type TagListProps = {
  fetchTags: () => void
  isFetching: boolean
  tags: string[]
}

export class TagList extends React.Component<TagListProps> {
  componentDidMount() {
    this.props.fetchTags()
  }

  render() {
    if (this.props.isFetching) {
      return null
    }

    /* eslint-disable fp/no-mutating-methods */
    return (
      <TagListWrapper>
        {mapTags([
          'all',
          ...[...this.props.tags].sort((a, b) => a.localeCompare(b)),
        ])}
      </TagListWrapper>
    )
    /* eslint-enable fp/no-mutating-methods */
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.items,
  isFetching: state.tags.isFetching,
})

const mapDispatchToProps = { fetchTags }

export default connect(mapStateToProps, mapDispatchToProps)(TagList)
