import React, { Fragment } from "react"
import styled from "styled-components"
import DONE_STATUS_LIST from "utils/data/doneStatusList"

const List = ({ products }) => (
  <Block>
    <span></span>
    <span>Название</span>
    <span>Тип</span>
    <span>Код</span>
    <span>Цена (руб.)</span>
    <span>Создан в</span>
    {products.map(({ _id, category, base, prettyPrice, doneStatus, date }) => (
      <Fragment key={_id}>
        <Status
          style={{ backgroundColor: DONE_STATUS_LIST[doneStatus || 0].color }}
        />
        <Name
          href={`/admin/catalog=${category}/product=${base.urlName}`}
          target="_blank"
        >
          {base.name}
        </Name>
        <span>{base.kind}</span>
        <span>{base.productCode}</span>
        <Price>{prettyPrice}</Price>
        <Datetime>{date}</Datetime>
      </Fragment>
    ))}
  </Block>
)

export default List

const Block = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr 1fr repeat(3, 80px);
  grid-gap: 10px;
  align-items: center;

  *:nth-child(-n + 6) {
    font-weight: bold;
  }

  *:nth-child(6n + 6),
  *:nth-child(6n + 5),
  *:nth-child(6n + 4) {
    text-align: right;
  }
`

const Datetime = styled.span`
  text-align: right;
  white-space: nowrap;
`

const Status = styled.span`
  height: 10px;
  border-radius: 50%;
`

const Name = styled.a`
  font-weight: 500;
  &:hover {
    background: #ddd;
  }
`

const Price = styled.span`
  color: green;
  white-space: nowrap;
`
