import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPost } from '../../actions/postActions'
import PostItem from './PostItem'
import { Segment } from 'semantic-ui-react'

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.posts
    return (
      <Segment loading={post === null || loading}>
        {post && <PostItem post={post} />}
      </Segment>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPost }
)(Post)
