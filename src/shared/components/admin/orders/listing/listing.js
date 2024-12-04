import React from "react"
import styled from "styled-components"
import STATUS_LIST from "../statusList"
import KINDS from "utils/data/kinds"

const Listing = ({ orders, selectedId, select }) => (
  <Block onClick={select}>
    {orders.map(({ _id, createdAt, prettyPrice, status, items }) => (
      <Item
        key={_id}
        selected={selectedId === _id}
        data-id={_id}
      >
        <Datetime>{createdAt}</Datetime>
        <Status>{STATUS_LIST[status]}</Status>
        <div>
          {[...new Set(items.map(item => KINDS[item.category]))].join(", ")}
        </div>
        <Price>{prettyPrice} р.</Price>
      </Item>
    ))}
  </Block>
)

export default Listing

const Block = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column nowrap;
  flex: 0 0 430px;
  overflow-y: scroll;
  border-left: 1px solid #ddd;
`

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-gap: 2px 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  user-select: none;
  ${props => props.selected && "background-color: #ddd; cursor: default;"};

  &:hover {
    background-color: #e7e7e7;
  }

  & * {
    pointer-events: none;
  }
`
const Datetime = styled.div`
  font-weight: 500;
`

const Price = styled.span`
  font-weight: 500;
  font-size: 15px;
  grid-row: 1 / span 3;
  grid-column: 2 / span 2;
  align-self: center;
`

const Status = styled.span`
  color: #555;
`
