import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const VarFields = ({ fields, count }) =>
  fields.map(({ name, value, price }, k) => (
    <Item key={k}>
      <Value>
        {name} <span>{value}</span>
      </Value>
      {price && (
        <Price>
          {prettyPrice(price)} &#8381; x {count}
        </Price>
      )}
      {price && <TotalPrice>{prettyPrice(price * count)} &#8381;</TotalPrice>}
    </Item>
  ))

export default VarFields

export const KuhnyaVarFields = ({ fields, count, names }) =>
  fields.map(({ name, value, price }, k) => {
    const isPartField = !names.includes(name)
    return (
      <Item key={k}>
        <Value>
          {name} <span>{value}</span>
        </Value>
        {price && (
          <Price data-cross={isPartField}>
            {prettyPrice(price)} &#8381; x {count}
          </Price>
        )}
        {price && (
          <TotalPrice data-hidden={isPartField}>
            {prettyPrice(price * count)} &#8381;
          </TotalPrice>
        )}
      </Item>
    )
  })

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 5px 0;
  border-top: 1px dotted #ddd;
`

const Value = styled.span`
  margin-right: 5px;
  flex: 1 1 auto;
`

const Price = styled.span`
  color: #777;
  flex: 0 0 150px;
  text-align: right;

  &[data-cross="true"] {
    text-decoration: line-through;
    color: #999;
  }
`

const TotalPrice = styled.span`
  font-weight: 600;
  flex: 0 0 150px;
  text-align: right;

  &[data-hidden="true"] {
    visibility: hidden;
  }
`
