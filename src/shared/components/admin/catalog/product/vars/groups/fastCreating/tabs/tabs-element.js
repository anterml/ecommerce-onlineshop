import React from "react"
import styled from "styled-components"

const values = ["Автоматически", "Вручную"]

const Tabs = ({ selected, change }) => (
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
  margin: 0 -30px 15px;
  padding: 10px 30px;
  background: #dfdfdf;
`

const Tab = styled.span`
  color: #999;
  user-select: none;
  cursor: default;

  &:first-child {
    margin-right: 15px;
  }

  &[data-selected="false"] {
    color: #0670eb;
    cursor: pointer;
  }
`
