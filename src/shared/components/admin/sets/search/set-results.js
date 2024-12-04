import React from "react"
import styled from "styled-components"

const SetsResult = ({ values, text }) =>
  values.map(({ _id, name, created: { date, author } }) => (
    <Link
      key={_id}
      data-id={_id}
      data-selected={false}
    >
      {prettyName(name, text)}
      <CreatedAt>{date}</CreatedAt>
      <Author>{author}</Author>
    </Link>
  ))

export default SetsResult

function prettyName(name, text) {
  const beg = name.toLowerCase().indexOf(text.toLowerCase())
  const end = beg + text.length

  return (
    <Name>
      {name.substr(0, beg)}
      <Selected>{name.substring(beg, end)}</Selected>
      {name.substr(end)}
    </Name>
  )
}

const Name = styled.span`
  font-weight: 500;
  color: #292929;
  display: inline-block;
`

const CreatedAt = styled.span`
  color: #999;
`

const Author = styled.span`
  color: #999;
`

const Link = styled.div`
  width: 100%;
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &[data-selected="true"] {
    background-color: #cad1d6;
  }

  & > * {
    margin-right: 8px;
    pointer-events: none;
  }
`

const Selected = styled.span`
  color: #bd0000;
`
