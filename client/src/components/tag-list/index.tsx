import React from 'react'
import { withRouter } from 'react-router-dom'
import getQueryParams from 'get-query-params'
import styled from 'styled-components/macro'
import TagItem from './item'
import { connect } from 'react-redux'
import { setTag, clearTags } from '../../actions/filter-search'

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
  isFetching: boolean
  tags: string[]
  history: {
    push: (item: string) => void
  }
  location: {
    search?: string
  }
  setTag: (tag: string) => void
  clearTags: () => void
}

type MaybeParams = {
  tags?: string
}

export class TagList extends React.Component<TagListProps> {
  componentDidMount() {
    if (this.props.location.search) {
      const params = getQueryParams(this.props.location.search) as MaybeParams
      if (params.tags) {
        const tags = params.tags.split(',')
        this.setTags(tags)
      }
    }
  }

  setTags = (tags: string[]) => {
    // eslint-disable-next-line fp/no-mutating-methods
    this.props.history.push(`?tags=${tags.join(',')}`)
    tags.forEach((tag) => {
      this.props.setTag(tag)
    })
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

const mapDispatchToProps = { setTag, clearTags }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TagList))
