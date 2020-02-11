import React from 'react'
import styled from 'styled-components/macro'
import PostListItem from './item'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import Empty from '../shared/empty'

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

class PostList extends React.Component {
  loadPosts = () => {
    const { tag } = this.props
    return this.props.fetchPosts(tag)
  }

  componentDidMount() {
    this.loadPosts()
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tag !== prevProps.tag
    ) {
      this.loadPosts()
    }
  }

  mapPosts = () =>
    this.props.posts.map((post, index) => (
      <PostListItem key={index} {...post} />
    ))

  render() {
    if (this.props.isFetching) {
      return <LoadingIndicatorBox />
    }
    if (!this.props.posts || this.props.posts.length === 0) {
      return <Empty />
    }
    return <List>{this.mapPosts()}</List>
  }
}

export default PostList
