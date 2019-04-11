import React, { Component } from 'react'
import PostItem from './PostItem'
import { Item, Segment } from 'semantic-ui-react'

class PostFeed extends Component {
  render() {
    const { posts } = this.props
    return (
      <Segment>
        <Item.Group divided>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </Item.Group>
      </Segment>
    )
  }
}

export default PostFeed
