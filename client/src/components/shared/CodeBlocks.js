import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/styles/hljs'
import './css/overrides.css'
const codeBlocks = require('gfm-code-blocks')

class CodeBlocks extends Component {
  render() {
    const { text } = this.props
    const gfmCodeBlocks = codeBlocks(text)

    let postSegments = []
    gfmCodeBlocks.forEach((block, index) => {
      let temp = {}

      temp.beforeCode =
        postSegments[index - 1] && postSegments[index - 1].afterCode
          ? null
          : text.slice(0, block.start).split('```')[0]

      temp.code = (
        <div key={block.start}>
          <SyntaxHighlighter
            style={docco}
            language={block.language ? block.language : null}
          >
            {block.code.trim()}
          </SyntaxHighlighter>
        </div>
      )

      temp.afterCode = text.slice(block.end).split('```')[0]

      postSegments.push(temp)
    })

    return (
      <>
        {postSegments.length
          ? postSegments.map((item, index) => (
              <div key={index}>
                <>{item.beforeCode}</>
                <>{item.code}</>
                <>{item.afterCode}</>
              </div>
            ))
          : text}
      </>
    )
  }
}

export default CodeBlocks
