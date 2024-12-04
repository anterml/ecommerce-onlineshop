import React from "react"
import styled from "styled-components"
import SaveButton from "./saveButton"
import DoneStatus from "./doneStatus"
import Clone from "./clone/clone"

const Header = ({
  product,
  status,
  auth,
  history,
  location,
  query,
  actions,
}) => (
  <Block>
    <span>
      <Name
        target="_blank"
        href={`/${
          product.general.category === "kuhnya"
            ? "mebel-kuhni"
            : product.general.department
        }/${product.general.category}/${product.base.urlName}`}
      >
        {product.base.kind || ""} {product.base.name}
      </Name>
      <ProductCode>[{product.base.productCode}]</ProductCode>
    </span>
    <Controls>
      <DoneStatus
        product={product}
        auth={auth}
        actions={actions.general}
      />
      <Clone {...{ product, history, location, query }} />
      <SaveButton
        product={product}
        status={status}
        actions={actions}
      />
    </Controls>
  </Block>
)

export default Header

const Block = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Controls = styled.div`
  white-space: nowrap;
  & > button {
    margin-left: 5px;
  }
`

const Name = styled.a`
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const ProductCode = styled.span`
  color: #999;
`
