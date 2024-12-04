import React from "react"
import styled from "styled-components"

const Result = ({ field, totalPrice, children, fieldList }) => (
  <Block>
    <Title>
      <TotalText>Итоговая цена:</TotalText>
      <TotalPrice>{totalPrice} руб</TotalPrice>
    </Title>

    <Image>
      {children}
      {/*getBackgrounds(colorData, field.value)*/}
    </Image>

    {Object.keys(fieldList)
      .filter(name => field[name])
      .map(name => (
        <Field key={name}>
          <FieldName>{fieldList[name]}:</FieldName>
          <FieldValue>{field[name]}</FieldValue>
        </Field>
      ))}
    <Price>{field.price || 0} руб</Price>
  </Block>
)

export default Result

const Block = styled.div`
  width: 100%;
  background-color: white;
`

const Title = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`

const TotalText = styled.span`
  font-weight: 300;
  margin-right: 3px;
  color: #595757;
`

const TotalPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
`

const Image = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  border: 1px solid #ddd;
`

const Field = styled.div`
  padding: 10px 0;
  border-bottom: 1px dotted #bebebe;
  font-weight: 300;
`

const FieldName = styled.div`
  display: inline-block;
  color: #595757;
  margin-right: 10px;
`

const FieldValue = styled.div`
  font-style: italic;
`

const Price = styled.div`
  line-height: 18px;
  font-size: 18px;
  font-weight: 300;
  margin-top: 10px;
`
