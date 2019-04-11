import React, { Component } from 'react'
import { Feed, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import PostForm from './PostForm'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.posts
    let events = posts.map(post => ({
      image: post.avatar,
      summary: post.name,
      meta: `${post.likes.length} Likes`,
      extraText: post.text
    }))
    return (
      <Segment>
        <PostForm />
        <Segment>
          <Feed events={events} />
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ({ posts }) => ({ posts })

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts)
