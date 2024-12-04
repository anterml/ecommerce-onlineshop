import React from "react"
import styled from "styled-components"

const Product = ({
  creating,
  updating,
  name,
  urlName,
  selected,
  prettyPrice,
  kind,
  productCode,
  doneStatusColor,
  selectProduct,
}) => (
  <Block
    onClick={selectProduct}
    data-url-name={urlName}
    selected={selected}
  >
    <DoneStatus color={doneStatusColor} />
    <Name>{name}</Name>
    <Price>{prettyPrice} р</Price>
    <Kind>{kind}</Kind>
    <ProductCode>код: {productCode}</ProductCode>
    <Datetime>
      {creating}
      <span>-</span>
      {updating}
    </Datetime>
  </Block>
)

export default Product

const Block = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto auto;
  grid-gap: 2px 10px;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const Datetime = styled.div`
  color: #999;
  white-space: nowrap;
  grid-column: 2 / 4;
  & span {
    color: #bbb;
    display: inline-block;
    margin: 0 5px;
  }
`

const Price = styled.div`
  font-weight: 500;
  font-size: 15px;
  justify-self: end;
`

const DoneStatus = styled.span`
  display: inline-block;
  border-radius: 50%;
  grid-column: 1 / 2;
  grid-row: 1 / 4;
  background-color: ${props => props.color || "#fff"};
  align-self: center;
  height: 10px;
  width: 10px;
`

const Name = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Kind = styled.div`
  color: #555;
`

const ProductCode = styled.div`
  color: #999;
  justify-self: end;
`
