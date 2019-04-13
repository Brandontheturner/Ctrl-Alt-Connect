import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const LikeButton = ({ auth, likes, like, unlike }) => {
  return likes.find(item => item.user === auth.user.id) ? (
    <Button
      icon="heart"
      color="red"
      basic
      compact
      onClick={unlike}
      content={likes.length}
    />
  ) : (
    <Button
      icon="heart outline"
      basic
      compact
      onClick={like}
      content={likes.length}
    />
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(LikeButton)
