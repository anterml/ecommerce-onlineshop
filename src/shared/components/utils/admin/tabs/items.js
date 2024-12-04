import React from "react"
import styled from "styled-components"

const Tabs = ({ tabs, selectedTab, select }) => (
  <Block>
    {Object.keys(tabs).map(tab => (
      <Tab
        data-tab={tab}
        selected={selectedTab === tab}
        onClick={select}
        key={tab}
      >
        {tabs[tab]}
      </Tab>
    ))}
  </Block>
)

export default Tabs

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  user-select: none;
`

const Tab = styled.span`
  margin-right: 15px;
  ${props =>
    props.selected
      ? "color: #888"
      : `
    color: #007dd0;
    cursor: pointer;
    &:hover {
      color: #115892;
    }
  `};
  border-radius: 3px;
  white-space: nowrap;
`
