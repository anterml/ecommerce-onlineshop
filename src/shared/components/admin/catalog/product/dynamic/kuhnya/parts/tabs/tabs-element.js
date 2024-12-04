import React from "react"
import styled from "styled-components"

const Tabs = ({ selected, change, values }) => (
  <Block onClick={change}>
    {values.map((value, i) => (
      <Tab
        data-i={i}
        data-selected={selected === i}
        key={i}
      >
        {value}
      </Tab>
    ))}
  </Block>
)

export default Tabs

const Block = styled.div`
  display: flex;
  padding: 10px 0;
  margin-bottom: 20px;
`

const Tab = styled.span`
  color: #999;
  user-select: none;
  cursor: default;

  &:not(:last-child) {
    margin-right: 15px;
  }

  &[data-selected="false"] {
    color: #0670eb;
    cursor: pointer;
  }
`
