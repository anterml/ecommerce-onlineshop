import React from "react"
import styled from "styled-components"
const OMIT_FIELDS = ["Вид принта"]

const Attrs = ({ fields }) => (
  <Block>
    {fields
      .filter(field => OMIT_FIELDS.indexOf(field.name) === -1)
      .map(({ name, value }, i) => {
        const text = Array.isArray(value) ? value.join(", ") : value

        return (
          <Item key={i}>
            <span>{name}</span>
            <Value>{text}</Value>
          </Item>
        )
      })}
  </Block>
)

export default Attrs

const Block = styled.div`
  color: black;
  margin-top: 5px;
`

const Item = styled.div`
  line-height: 18px;
  margin-bottom: 8px;
`

const Value = styled.div`
  color: #777;
`
