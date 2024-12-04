import React from "react"
import styled from "styled-components"
import NoIndex from "globalComponents/noindex"

const Header = ({ name, productCode, goToAdminPage, isAdmin }) => (
  <Block onClick={goToAdminPage}>
    <Name data-link={isAdmin}>{name}</Name>
    <NoIndex>
      <ProductCode>
        <ProductCodeTitle>Код продукта</ProductCodeTitle>
        <ProductCodeValue>{productCode}</ProductCodeValue>
      </ProductCode>
    </NoIndex>
  </Block>
)

export default Header

const Block = styled.div`
  margin-bottom: 15px;
`

const Name = styled.h1`
  display: inline-block;
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;

  &[data-link="true"]:hover {
    cursor: pointer;
    color: #333;
  }

  @media (min-width: 768px) {
    color: #7e7e7e;
    font-weight: 300;
    line-height: 25px;
    font-size: 24px;
  }
`

const ProductCode = styled.div`
  color: #a3a3a3;
`

const ProductCodeTitle = styled.span`
  font-weight: 300;
  margin-right: 4px;
`

const ProductCodeValue = styled.span`
  color: #636363;
`
