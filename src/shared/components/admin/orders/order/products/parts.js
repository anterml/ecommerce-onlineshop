import React from "react"
import styled from "styled-components"
import prettyPrice from "utils/prettyPrice"
import { getResultProperties } from "utils/data/parts"

const Parts = ({ urlName, parts, varFields, count }) => (
  <Block>
    <Title>Модули {parts.length} шт.</Title>
    {parts.map(
      ({
        _id,
        price,
        kind,
        name,
        code,
        count: partCount,
        properties,
        fields,
      }) => {
        const link = `/admin/catalog=kuhnya/product=${urlName}?partId=${_id}&pt=parts`
        const props = getResultProperties({ properties, kind })

        const pricedFields = varFields.reduce((acc, f) => {
          const customField = fields.find(field => field._id === f._id)
          // если есть свое поле
          if (customField) {
            acc.push({ ...f, price: customField.price || 0, oldPrice: f.price })
          }
          // или общее поле с ценой
          else if (f.price) {
            acc.push(f)
          }
          return acc
        }, [])

        const resultFields = pricedFields.filter(f => props.includes(f.name))

        return (
          <Part key={_id}>
            <Item>
              <Code>{code}.</Code>
              <Name>
                <a
                  href={link}
                  target="_blank"
                >
                  {kind} {name}
                </a>
              </Name>
              <Price>
                {prettyPrice(price)} x {partCount} x {count} &#8381;
              </Price>
              <Price>{prettyPrice(price * partCount * count)} &#8381;</Price>
            </Item>
            {resultFields.map(({ _id, name, value, price, oldPrice }) => (
              <Property key={_id}>
                <Name>
                  {name} {value}
                </Name>
                <Price>
                  {oldPrice && <OldPrice>{prettyPrice(oldPrice)}</OldPrice>}
                  {prettyPrice(price)} x {partCount} x {count} &#8381;
                </Price>
                <Price>{prettyPrice(price * partCount * count)} &#8381;</Price>
              </Property>
            ))}
          </Part>
        )
      },
    )}
  </Block>
)

export default Parts

const Block = styled.div`
  margin: 20px 0 0;
  a {
    color: #0670eb;
    display: inline-block;
    &:hover {
      color: #115892;
    }
  }
`

const Part = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`

const Title = styled.div`
  margin-bottom: 10px;
  color: #999;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
  border-bottom: 1px dotted #ddd;
`

const Name = styled.span`
  flex: 1 1 auto;
`

const Code = styled.span`
  margin-right: 5px;
`

const Price = styled.span`
  white-space: nowrap;
  flex: 0 0 150px;
  text-align: right;

  &:last-child {
    font-weight: 600;
  }
`

const Property = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
  border-bottom: 1px dotted #ddd;
`

const OldPrice = styled.span`
  color: #999;
  text-decoration: line-through;
  margin-right: 5px;
`
