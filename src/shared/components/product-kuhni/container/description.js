import React from "react"
import styled from "styled-components"

const Description = ({ text }) => (
  <Block>
    <Title>Описание</Title>
    <Text
      dangerouslySetInnerHTML={{ __html: text }} /*itemProp="description"*/
    />
  </Block>
)

export default Description

const Block = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  padding: 20px 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const Title = styled.h2`
  margin: 0 0 10px;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
`

const Text = styled.p`
  line-height: 22px;
  margin: 0;
`
