import React from 'react'
import styled from 'styled-components/macro'
import ResourceListItem from './item'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import Empty from '../shared/empty'
import { Resource } from '../../interfaces'
import { connect } from 'react-redux'
import {
  fetchResources,
  filterResources,
  searchResources,
} from '../../actions/resources'

const List = styled.ul`
  list-style: none;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;

  @media (max-width: 768px) {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
`

type ResourceListProps = {
  fetchResources: () => void
  filterResources: (tags: string[]) => void
  filters?: string[]
  isFetching: boolean
  resources: Resource[]
  search?: string
  searchResources: (text: string) => void
}

export class ResourceList extends React.Component<ResourceListProps> {
  loadResources = () => {
    const { filters, search } = this.props
    if (search && search.length) {
      return this.props.searchResources(search)
    }

    if (filters && filters.length) {
      return this.props.filterResources(filters)
    }

    return this.props.fetchResources()
  }

  componentDidMount() {
    this.loadResources()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.filters !== prevProps.filters ||
      this.props.search !== prevProps.search
    ) {
      this.loadResources()
    }
  }

  mapResources = () =>
    this.props.resources.map((resource, index) => (
      <ResourceListItem key={index} {...resource} />
    ))

  render() {
    if (this.props.isFetching) {
      return <LoadingIndicatorBox />
    }
    if (!this.props.resources || this.props.resources.length === 0) {
      return <Empty />
    }
    return <List>{this.mapResources()}</List>
  }
}

const mapStateToProps = (state) => ({
  resources: state.resources.items,
  isFetching: state.resources.isFetching,
  filters: state.filterSearch.tags,
  search: state.filterSearch.search,
})

const mapDispatchToProps = { fetchResources, filterResources, searchResources }

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
