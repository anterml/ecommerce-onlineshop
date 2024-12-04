import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const ProductsResults = ({ values, text, context }) =>
  values.map(({ _id, base }) => {
    const { name, kind, price, productCode } = base

    return (
      <Link
        key={_id}
        data-id={_id}
        data-selected={false}
      >
        <ProductCode>{productCode}</ProductCode>
        {context === "name" ? prettyName(name, text) : <Name>{name}</Name>}
        <span>{kind}</span>
        <Price>{prettyPrice(price)} руб</Price>
      </Link>
    )
  })

export default ProductsResults

function prettyName(name, text) {
  const pos = name.indexOf(text)
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

const ProductCode = styled.span`
  color: #999;
`

const Name = styled.span`
  font-weight: 500;
  color: #292929;
  display: inline-block;
`

const Price = styled.span`
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
