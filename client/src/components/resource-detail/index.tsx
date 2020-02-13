import React from 'react'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import Empty from '../shared/empty'
import ResourceDetailResource from './resource'
import InfoBar from './info-bar'
import { connect } from 'react-redux'
import { fetchResource } from '../../actions/resources'

export class ResourceDetail extends React.Component {
  componentDidMount() {
    this.props.fetchResource(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.resource !== prevProps.resource &&
      this.props.resource === null
    ) {
      this.props.history.goBack()
    }
  }

  render() {
    const { resource } = this.props
    if (this.props.isFetching) {
      return <LoadingIndicatorBox />
    }
    if (!resource) {
      return <Empty />
    }
    return (
      <React.Fragment>
        <ResourceDetailResource {...resource} />
        <InfoBar id={resource.id} views={resource.views} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.resources.isFetching,
  resource: state.resources.resource,
})

const mapDispatchToProps = { fetchResource }
export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail)
