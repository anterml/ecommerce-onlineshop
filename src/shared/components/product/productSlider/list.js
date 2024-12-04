import React from "react"
import styled from "styled-components"
import Link from "react-router-dom/Link"

const List = ({ category, values, urlName, isAdmin }) =>
  values.map(
    ({ _id, base, prettyPrice, revisionStatus, image, department }) => (
      <Item
        to={`/${department}/${category}/${base.urlName}`}
        data-selected={urlName === base.urlName}
        key={_id}
      >
        <Image style={image} />

        {isAdmin ? (
          <ProductCode data-rs={revisionStatus}>{base.productCode}</ProductCode>
        ) : (
          <Price>
            <span>{prettyPrice}</span> руб
          </Price>
        )}
      </Item>
    ),
  )

export default List

const Item = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 0 0 127px;
  height: 130px;
  margin-right: 8px;
  background: white;
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &[data-selected="true"] {
    border-color: #b30202;
  }

  &:hover {
    border-color: #3b7ba7;
  }
`

const Image = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1 1 auto;
  pointer-events: none;
`

const Price = styled.div`
  padding: 0px 5px;
  margin: 10px 0;
  text-align: center;
  white-space: nowrap;
  color: #787878;
  font-size: 12px;
  font-weight: 300;
  pointer-events: none;
`

const ProductCode = styled(Price)`
  &[data-rs="1"] {
    color: green;
    font-size: 17px;
    font-weight: 500;
  }

  &[data-rs="2"] {
    color: #b30202;
    font-size: 17px;
    font-weight: 500;
  }
`
