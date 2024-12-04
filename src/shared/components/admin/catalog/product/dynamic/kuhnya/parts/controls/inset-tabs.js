import React from "react"
import styled from "styled-components"

const InsetTabs = ({ values, parts, tab, change }) => {
  const stats = parts.reduce(
    (acc, part) => {
      acc[part.inset ? 1 : 2] += 1
      return acc
    },
    [parts.length, 0, 0],
  )

  return (
    <Tabs>
      {values.map((name, i) => (
        <Tab
          key={name}
          data-tab={name}
          data-selected={name === tab}
          onClick={change}
        >
          {name} {stats[i]}
        </Tab>
      ))}
    </Tabs>
  )
}

export default InsetTabs

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.span`
  cursor: pointer;

  &[data-selected="false"] {
    color: #999;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }
`
