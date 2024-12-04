import React from "react"
import styled from "styled-components"
import normalizeDescription from "utils/normalize-description"

const Content = ({ text, change }) => (
  <Block>
    <textarea
      value={text}
      onChange={change}
    />
    <div dangerouslySetInnerHTML={{ __html: normalizeDescription(text) }} />
  </Block>
)

export default Content

const Block = styled.div`
  overflow: auto;
  padding: 10px 20px 100px 20px;

  textarea {
    width: 100%;
    height: 300px;
    margin: 15px 0;
  }
`
