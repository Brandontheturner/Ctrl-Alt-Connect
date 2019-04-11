import React, { Component } from 'react'
import { Item, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import PostForm from './PostForm'
import PostItem from './PostItem'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.posts
    return (
      <Segment>
        <PostForm />
        <Segment loading={posts === null || loading}>
          <Item.Group divided>
            {posts.map(post => (
              <PostItem key={post._id} post={post} showActions={true} />
            ))}
          </Item.Group>
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
