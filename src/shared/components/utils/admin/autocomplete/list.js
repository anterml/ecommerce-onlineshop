import React from "react"
import styled from "styled-components"
import Item from "./item"

const List = ({ values, text, index, select, mouseOver, mouseOut }) => {
  const items = values.map((value, i) => {
    const beg = value.toLowerCase().indexOf(text)
    const end = beg + text.length

    const startWord = value.substr(0, beg)
    const endWord = value.substr(end)
    const hlWord = value.substring(beg, end)

    return (
      <Item
        value={value}
        selected={index === i}
        startWord={startWord}
        hlWord={hlWord}
        endWord={endWord}
        key={value}
      />
    )
  })

  return (
    <Block
      onMouseDown={select}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      {items}
    </Block>
  )
}

export default List

const Block = styled.div`
  position: absolute;
  top: 33px;
  left: 1px;
  min-width: 100%;
  color: #6b6b6b;
  background: #e7ebee;
  z-index: 1001;
  font-size: 13px;
  max-height: 440px;
  overflow-y: auto;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.44);
`
