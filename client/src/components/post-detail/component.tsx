import React from 'react'
import LoadingIndicatorBox from '../shared/loading-indicator/box'
import Empty from '../shared/empty'
import PostDetailPost from './post'
import PostDetailInfoBarContainer from './info-bar/container'

class PostDetail extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post && this.props.post === null) {
      this.props.history.goBack()
    }
  }

  render() {
    const { post } = this.props
    if (this.props.isFetching) {
      return <LoadingIndicatorBox />
    }
    if (!post) {
      return <Empty />
    }
    return (
      <>
        <PostDetailPost {...post} />
        <PostDetailInfoBarContainer
          id={post.id}
          views={post.views}
        />
      </>
    )
  }
}

export default PostDetail
