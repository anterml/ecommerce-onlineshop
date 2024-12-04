import React from "react"
import styled from "styled-components"

const dontChange = () => {}

const Link = ({ title, url, click }) => (
  <Block>
    <Title>{title}</Title>
    <input
      onClick={click}
      value={url}
      onChange={dontChange}
    />
  </Block>
)

export default Link

const Block = styled.div`
  margin-bottom: 15px;

  input {
    max-width: 100%;
    width: 100%;
    border: 1px solid transparent;
    color: #666;
  }
`

const Title = styled.div`
  margin-bottom: 5px;
`
