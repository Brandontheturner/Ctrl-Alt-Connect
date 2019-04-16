import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, likePost, unlikePost } from '../../actions/postActions'
import LikeButton from './LikeButton'
import TrashButton from '../shared/buttons/TrashButton'
import ProfileImage from '../profiles/ProfileImage'
import SyntaxHighlighter from 'react-syntax-highlighter'
import './css/overrides.css'
const codeBlocks = require('gfm-code-blocks')

class PostItem extends Component {
  handleDeleteClick = id => this.props.deletePost(id)
  handleLikeClick = id => this.props.likePost(id)
  handleUnlikeClick = id => this.props.unlikePost(id)

  render() {
    const { post, auth, showActions } = this.props
    const blocks = codeBlocks(post.text)
    console.log('TCL: PostItem -> render -> blocks', blocks)
    let postArr = []
    blocks.map((block, index) => {
      let temp = {}

      temp.beforeCode =
        postArr[index - 1] && postArr[index - 1].afterCode
          ? null
          : post.text.slice(0, block.start).split('```')[0]

      temp.code = (
        <div key={block.start}>
          <SyntaxHighlighter language={block.language ? block.language : null}>
            {block.code.trim()}
          </SyntaxHighlighter>
        </div>
      )

      temp.afterCode = post.text.slice(block.end).split('```')[0]

      postArr.push(temp)
    })

    return (
      <Item>
        <ProfileImage to={`/profile/user/${post.user}`} src={post.avatar} />
        <Item.Content>
          {post.user === auth.user.id && showActions && (
            <TrashButton
              item="Post"
              action={() => this.handleDeleteClick(post._id)}
            />
          )}
          <Item.Header>{post.name}</Item.Header>
          <Item.Description>
            {postArr.length
              ? postArr.map((item, index) => (
                  <div key={index}>
                    <>{item.beforeCode}</>
                    <>{item.code}</>
                    <>{item.afterCode}</>
                  </div>
                ))
              : post.text}
          </Item.Description>
          {showActions && (
            <Item.Extra>
              <LikeButton
                likes={post.likes}
                like={() => this.handleLikeClick(post._id)}
                unlike={() => this.handleUnlikeClick(post._id)}
              />
              <Button
                as={Link}
                to={`/post/${post._id}`}
                primary
                content={`Comments ${post.comments.length}`}
                compact
              />
            </Item.Extra>
          )}
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  { deletePost, likePost, unlikePost }
)(PostItem)
