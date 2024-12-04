import React from "react"
import styled from "styled-components"

const Tabs = ({ tab, change }) => (
  <Block>
    <Tab
      data-selected={tab === "all"}
      data-tab="all"
      onClick={change}
    >
      Цвета
    </Tab>
    <Tab
      data-selected={tab === "match"}
      data-tab="match"
      onClick={change}
    >
      Сопоставления
    </Tab>
  </Block>
)

export default Tabs

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Tab = styled.span`
  padding: 0 15px;
  color: #999;
  font-weight: 500;
  font-size: 16px;

  &[data-selected="false"] {
    cursor: pointer;
    text-decoration: underline;
    color: #3787bb;
  }
`
