import { connect } from 'react-redux'
import { fetchPost } from '../../actions/posts'
import PostDetail from './component'

export const mapStateToProps = (state) => ({
  isFetching: state.posts.isFetching,
  post: state.posts.post,
})

const mapDispatchToProps = { fetchPost }

const enhance = connect(mapStateToProps, mapDispatchToProps)

const PostDetailContainer = enhance(PostDetail)

export default PostDetailContainer
