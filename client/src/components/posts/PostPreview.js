import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Accordion } from 'semantic-ui-react'
import './css/overrides.css'

class PostItem extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { post } = this.props
    return (
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
          <Item.Header>{post.subject}</Item.Header>
          <Accordion
            panels={[
              {
                key: post._id,
                title: 'Show Details',
                content: post.text
              }
            ]}
          />
        </Item.Content>
      </Item>
    )
  }
}

export default PostItem
