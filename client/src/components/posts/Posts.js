import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import PostForm from './PostForm'
import PostFeed from './PostFeed'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts } = this.props.posts
    return (
      <Segment>
        <PostForm />
        <PostFeed posts={posts} />
      </Segment>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
