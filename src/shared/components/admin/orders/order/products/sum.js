import React, { Fragment } from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"

const Sum = ({ totalPrice, delivery }) => (
  <Fragment>
    <Block>
      <Content>
        Общая сумма товаров
        <Value>{prettyPrice(totalPrice)} &#8381;</Value>
      </Content>
      <Content>
        Доставка <strong>{delivery.value}</strong>
        <Value>{prettyPrice(delivery.price)} &#8381;</Value>
      </Content>
    </Block>

    <Result>
      Итого
      <ResultValue>
        {prettyPrice(totalPrice + (delivery.price || 0))}
      </ResultValue>{" "}
      &#8381;
    </Result>
  </Fragment>
)

export default Sum

const Block = styled.div`
  margin-top: 30px;
`

const Content = styled.div`
  margin-top: 5px;
  text-align: right;
`

const Value = styled.span`
  min-width: 140px;
  margin-left: 10px;
  display: inline-block;
  font-size: 16px;
`

const Result = styled.div`
  font-size: 22px;
  text-align: right;
  color: #6bb30f;
  text-transform: uppercase;
  margin: 30px 0;
`

const ResultValue = styled.span`
  font-size: 22px;
  text-align: right;
  color: #6bb30f;
  text-transform: uppercase;
  margin: 30px 0 30px 15px;
`
