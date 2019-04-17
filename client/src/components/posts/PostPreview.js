import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Button } from 'semantic-ui-react'
import CodeBlocks from '../shared/CodeBlocks'
import './css/overrides.css'

const PostItem = ({ post }) => (
  <Item>
    <Item.Content>
      <Button
        as={Link}
        to={`/post/${post._id}`}
        content="Go to post"
        basic
        compact
        floated="right"
        icon="angle right"
        labelPosition="right"
      />
      <Item.Header>{post.name}</Item.Header>
      <Item.Description>
        <CodeBlocks text={post.text} />
      </Item.Description>
    </Item.Content>
  </Item>
)

export default PostItem
