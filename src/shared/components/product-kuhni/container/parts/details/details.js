import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"
import Image from "./image"

const Details = ({
  part: {
    kind,
    name,
    priceFields,
    price,
    totalPrice,
    fullImageUrl,
    images,
    dimension,
    description,
    article,
  },
  hideDetails,
}) => (
  <Block>
    <Overlay onClick={hideDetails} />
    <Content>
      <Image
        url={fullImageUrl}
        images={images}
      />
      <Info>
        <Name>
          {kind} {name}
        </Name>
        {dimension && (
          <Item>
            <Title>Размеры</Title>
            {dimension}
          </Item>
        )}

        {description && (
          <Item>
            <Title>Описание</Title>
            {description}
          </Item>
        )}

        {article && (
          <Item>
            <Title>Артикул</Title>
            {article}
          </Item>
        )}

        {price !== totalPrice ? (
          <div>
            <PriceItem>
              <span>Базовая цена</span>
              <span>{prettyPrice(price)} руб.</span>
            </PriceItem>
            {priceFields
              .filter(f => f.price)
              .map(({ _id, name, value, price }) => (
                <PriceItem key={_id}>
                  <span>
                    {name} {value}
                  </span>
                  <span>+{prettyPrice(price)} руб.</span>
                </PriceItem>
              ))}
            <PriceItem>
              <span>Итоговая цена</span>
              <span>{prettyPrice(totalPrice)} руб.</span>
            </PriceItem>
          </div>
        ) : (
          <Price>Цена {prettyPrice(price)} руб.</Price>
        )}
      </Info>
    </Content>
  </Block>
)

export default Details

const Item = styled.div`
  margin-bottom: 20px;
`

const Content = styled.div`
  flex: 0 0 auto;
  display: flex;
  box-shadow: 0 0 2px 2px #aaa;
  background-color: #fff;
  padding: 30px;
  z-index: 51;
`

const Info = styled.div`
  width: 270px;
`

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;

  &:last-child {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #ddd;
    font-weight: 500;
    font-size: 15px;
  }

  & > * {
    display: inline-block;
    &:last-child {
      margin-left: 5px;
      color: green;
      white-space: nowrap;
    }
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(233, 233, 233, 0.95);
  z-index: 50;
  overflow: auto;
`

const Block = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Name = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`

const Title = styled.div`
  color: #999;
  font-weight: 500;
`

const Price = styled.div`
  font-weight: 500;
  font-size: 18px;
  //text-align: right;
`
