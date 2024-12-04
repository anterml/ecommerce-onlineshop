import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const Item = ({
  fullName,
  price,
  count,
  totalPrice,
  backgroundImage,
  url,
  children,
  productCode,
}) => (
  <Block>
    <div>
      <Image style={{ backgroundImage }} />
      <ProductCode>код {productCode}</ProductCode>
    </div>
    <Wrap>
      <Content>
        <Name
          href={url}
          target="_blank"
        >
          {fullName}
        </Name>
        {price && (
          <Price>
            {prettyPrice(price)} &#8381; x {count}
          </Price>
        )}
        {price && <TotalPrice>{prettyPrice(price * count)} &#8381;</TotalPrice>}
      </Content>
      {children}
      <Result>{prettyPrice(totalPrice * count)} &#8381;</Result>
    </Wrap>
  </Block>
)

export default Item

const Block = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;

  &:first-child {
    border-top: 1px solid #ddd;
  }
`

const Image = styled.div`
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`

const Wrap = styled.div`
  width: 100%;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`

const Name = styled.a`
  flex: 1 1 auto;
  font-weight: 500;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #000;
  }
`

const Price = styled.span`
  color: #666;
  flex: 0 0 150px;
  text-align: right;
  font-size: 16px;
`

const TotalPrice = styled.span`
  font-weight: 600;
  flex: 0 0 150px;
  text-align: right;
  font-size: 16px;
`

const Result = styled.div`
  text-align: right;
  border-top: 1px dotted #ddd;
  padding-top: 15px;
  font-size: 16px;
  color: #a54242;
`

const ProductCode = styled.div`
  color: #888;
  padding: 4px 0;
`
