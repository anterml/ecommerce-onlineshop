import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const Result = ({
  productCount,
  totalPrice,
  deliveryPrice,
  deliveryDefinedByManager,
}) => (
  <Block>
    <Item>
      <Title>Товары ({productCount})</Title>
      <Filler />
      <Price>{prettyPrice(totalPrice)} руб</Price>
    </Item>

    {!deliveryDefinedByManager ? (
      <Item>
        <Title>Доставка</Title>
        <Filler />
        <Price>{prettyPrice(deliveryPrice)} руб</Price>
      </Item>
    ) : (
      <Item>
        <Title style={{ color: "#be0001" }}>
          Стоимость доставки уточняется у менеджера
        </Title>
      </Item>
    )}

    <Total>
      <TotalText>Итого к оплате:</TotalText>
      <TotalPrice>{prettyPrice(totalPrice + deliveryPrice)} руб</TotalPrice>
    </Total>
  </Block>
)

export default Result

const Block = styled.div`
  width: 100%;
  flex-flow: column nowrap;
  margin: 0 0 30px;

  @media (min-width: 650px) {
    flex-flow: row nowrap;
    margin: 0 40px 0 0;
  }
`

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 5px;
  white-space: nowrap;
`

const Title = styled.span``

const Filler = styled.span`
  display: inline-block;
  border-bottom: 1px dotted #ccc;
  width: 100%;
  margin: 0 5px 5px;
`

const Price = styled.span``

const Total = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;
  font-weight: 600;
  margin-top: 20px;
`

const TotalText = styled.span`
  font-size: 16px;
`

const TotalPrice = styled.span`
  font-size: 20px;
  white-space: nowrap;
`
