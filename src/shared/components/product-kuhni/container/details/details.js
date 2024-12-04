import React, { Fragment } from "react"
import styled from "styled-components"

import Price from "./price"
import Instock from "./instock"
import Credit from "./credit"
import Delivery from "./delivery/delivery"

import { DELIVERY } from "utils/data/constants"

const Details = ({
  price,
  currentPrettyPrice,
  oldPrettyPrice,
  creditPrice,
  warranty,
}) => (
  <Fragment>
    <PriceWrap>
      <Price
        current={currentPrettyPrice}
        old={oldPrettyPrice}
      />
      {false && <Credit price={creditPrice} />}
    </PriceWrap>
    <Info>
      <Text>Гарантия {warranty} мес</Text>
      <Text>
        {price >= DELIVERY.FURNITURE.MIN_FREE_PRICE &&
          "Бесплатная доставка по Санкт-Петербургу"}
      </Text>
      <Delivery minFreePrice={DELIVERY.FURNITURE.MIN_FREE_PRICE} />
    </Info>
  </Fragment>
)

export default Details

const PriceWrap = styled.div`
  margin-right: 20px;
`

const Info = styled.div`
  margin: 10px 0;
  display: none;
`

const Text = styled.div`
  margin-bottom: 3px;
  line-height: 15px;
  font-weight: 300;
`
