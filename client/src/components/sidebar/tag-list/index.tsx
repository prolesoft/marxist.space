import React from 'react'
import styled from 'styled-components/macro'
import SidebarTagListItem from './item'
import SidebarTagListHeader from './header'
import { connect } from 'react-redux'
import { fetchTags } from '../../../actions/tags'

const TagList = styled.nav`
  display: flex;
  flex-direction: column;
`

const mapTags = (tags) =>
  tags.map((tag, index) => <SidebarTagListItem key={index} tag={tag} />)

type Props = {
  fetchTags: () => void
  isFetching: boolean
}

export class SidebarTagList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchTags()
  }

  render() {
    if (this.props.isFetching) {
      return null
    }

    return (
      <TagList>
        <SidebarTagListHeader />
        {mapTags(['all', ...this.props.tags])}
      </TagList>
    )
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.items,
  isFetching: state.tags.isFetching,
})

const mapDispatchToProps = { fetchTags }

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTagList)
