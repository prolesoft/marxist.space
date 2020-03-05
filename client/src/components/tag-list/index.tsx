import React from 'react'
import styled from 'styled-components/macro'
import TagItem from './item'
import { connect } from 'react-redux'
import { fetchTags } from '../../actions/tags'

const Aside = styled.aside`
  margin-bottom: 16px;
  margin-right: 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  background-color: ${(props) => props.theme.foreground};

  @media (min-width: 769px) {
    max-width: 300px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 16px;
  }
`

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
      <Aside>
        <TagListWrapper>
          {mapTags([
            'all',
            ...[...this.props.tags].sort((a, b) => a.localeCompare(b)),
          ])}
        </TagListWrapper>
      </Aside>
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
