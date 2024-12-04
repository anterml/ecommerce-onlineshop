import React from "react"
import styled from "styled-components"
import Graphs from "./graphs/graphs"
import Products from "./products/products"

const Stats = () => (
  <Block>
    <Sidebar />
    <Content>
      <Graphs />
      <Products />
    </Content>
  </Block>
)

export default Stats

const Block = styled.div`
  display: flex;
  overflow: hidden;
`

const Content = styled.div`
  flex: 1 1 auto;
  padding-left: 20px;
`
