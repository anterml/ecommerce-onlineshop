import React from "react"
import styled from "styled-components"

const DropDown = ({ selectedValue, title, children, width }) => (
  <Block width={width}>
    <Title>{title}</Title>
    <SelectedValue>{selectedValue}</SelectedValue>
    <Items>{children}</Items>
  </Block>
)

export default DropDown

const Items = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 1px;
  display: none;
  background-color: white;
  z-index: 5;
  user-select: none;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.41);
`

const Block = styled.div`
  display: inline-block;
  width: ${props => props.width || "auto"};
  padding: 5px 12px;
  user-select: none;
  cursor: default;
  &:hover {
    background: #ddd;
  }
  &:hover ${Items} {
    display: inline-block;
  }
`

const Title = styled.div`
  color: #333;
  font-weight: 500;
`

const SelectedValue = styled.div`
  color: #666;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Item = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 6px 14px;
  white-space: nowrap;

  &:hover {
    background-color: #ddd;
  }

  ${props =>
    props.selected &&
    `
    &, &:hover {
      background-color: #333;
      color: white;
    }
  `};
`
