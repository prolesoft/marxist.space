import React from 'react'
import styled from 'styled-components/macro'
import ResourceListItem from './item'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import Empty from '../shared/empty'
import { connect } from 'react-redux'
import { fetchResources } from '../../actions/resources'

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

export class ResourceList extends React.Component {
  loadResources = () => {
    const { tag } = this.props
    return this.props.fetchResources(tag)
  }

  componentDidMount() {
    this.loadResources()
  }

  componentDidUpdate(prevProps) {
    if (this.props.tag !== prevProps.tag) {
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
})

const mapDispatchToProps = { fetchResources }

export default connect(mapStateToProps, mapDispatchToProps)(ResourceList)
