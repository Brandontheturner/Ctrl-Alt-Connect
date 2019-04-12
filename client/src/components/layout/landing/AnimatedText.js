import React, { Component } from 'react'
import Typed from 'typed.js'

class AnimatedText extends Component {
  componentDidMount() {
    const { strings } = this.props
    const options = {
      strings: strings,
      startDelay: 2000,
      typeSpeed: 100
    }
    this.typed = new Typed(this.el, options)
  }
  componentWillUnmount() {
    this.typed.destroy()
  }
  render() {
    return (
      <span
        style={{ whiteSpace: 'pre' }}
        ref={el => {
          this.el = el
        }}
      />
    )
  }
}

export default AnimatedText
