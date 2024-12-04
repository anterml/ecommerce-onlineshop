import React, { Fragment } from "react"
import styled from "styled-components"

import Price from "./price"
import Instock from "./instock"
import InstockPlaces from "./instock-places/instock-places"
import Credit from "./credit"
import Delivery from "./delivery/delivery"

import { DELIVERY } from "utils/data/constants"

const Details = ({
  category,
  price,
  currentPrettyPrice,
  oldPrettyPrice,
  instock,
  instockPlaces,
  creditPrice,
  warranty,
  availableVisibility,
}) => (
  <Fragment>
    <Price
      current={currentPrettyPrice}
      old={oldPrettyPrice}
    />
    {Array.isArray(instockPlaces) && !!instockPlaces.length ? (
      <InstockPlaces places={instockPlaces} />
    ) : (
      !(instock !== 1 && availableVisibility) && <Instock value={instock} />
    )}
    {category !== "sp_phone" && <Credit price={creditPrice} />}
    <Info>
      <Text>Гарантия {warranty} мес</Text>
      <Text>
        {category !== "sp_phone" &&
          price >= DELIVERY.FURNITURE.MIN_FREE_PRICE &&
          "Бесплатная доставка по Санкт-Петербургу"}
      </Text>
      <Delivery minFreePrice={DELIVERY.FURNITURE.MIN_FREE_PRICE} />
    </Info>
  </Fragment>
)

export default Details

const Info = styled.div`
  margin: 10px 0;
`

const Text = styled.div`
  margin-bottom: 3px;
  line-height: 15px;
  font-weight: 300;
`
