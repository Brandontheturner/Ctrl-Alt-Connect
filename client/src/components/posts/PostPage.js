import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import { Segment, Item } from 'semantic-ui-react'
import isEmpty from '../../utils/isEmpty'
import PostItem from './PostItem'
import EditPost from './EditPost'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'
import PageHeader from '../shared/pages/PageHeader'
import BackToFeed from '../shared/buttons/BackToFeed'

class Post extends Component {
  state = { editMode: false }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
    if (this.props.location.pathname.includes('edit')) {
      this.setState({ editMode: true })
    } else {
      this.setState({ editMode: false })
    }
  }

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors })
  }

  render() {
    const { editMode } = this.state
    const { post, loading } = this.props.posts
    return editMode ? (
      <>
        <BackToFeed />
        {!isEmpty(post) && <EditPost post={post} />}
      </>
    ) : (
      <>
        <BackToFeed />
        {!isEmpty(post) && (
          <>
            <PageHeader content={`${post.name.split(' ')[0]}'s Post`} />
            <Segment attached="bottom" loading={post === null || loading}>
              <Item.Group>
                <PostItem post={post} showActions={false} />
              </Item.Group>
              <CommentForm postId={post._id} />
              <CommentFeed comments={post.comments} postId={post._id} />
            </Segment>
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
