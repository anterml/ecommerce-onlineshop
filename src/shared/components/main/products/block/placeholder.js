import React from "react"
import styled from "styled-components"

const items = [1, 2, 3, 4, 5, 6]

const Placeholder = ({}) => (
  <Block>
    {items.map(v => (
      <Item key={v}>
        <Image />
        <Text />
        <Text />
      </Item>
    ))}
  </Block>
)

export default Placeholder

const Block = styled.div`
  display: flex;
  overflow: hidden;
  padding-top: 54px;
  margin-bottom: 50px;
  height: 331px;
`

const Item = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 10px;
  flex: 0 0 205px;
  padding: 5px;
  background: transparent;

  & > * {
    background: #e1e1e1;
  }
`

const Image = styled.div`
  margin-bottom: 10px;
  flex: 1 1 auto;
`

const Text = styled.div`
  margin-bottom: 5px;
  flex: 0 0 14px;
  &:nth-of-type(2) {
    width: 100px;
  }
  &:nth-of-type(3) {
    width: 150px;
  }
`
