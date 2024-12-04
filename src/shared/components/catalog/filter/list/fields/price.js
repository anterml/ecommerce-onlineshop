import React from "react"
import styled from "styled-components"

const Price = ({ min, max, change, apply }) => (
  <Block>
    <Input
      defaultValue={min}
      key={"min" + min}
      name="min"
      placeholder="От"
      onBlur={change}
    />
    <Input
      defaultValue={max}
      key={"max" + max}
      name="max"
      placeholder="До"
      onBlur={change}
    />
    <Button onClick={apply}>Ок</Button>
  </Block>
)

export default Price

const Block = styled.div`
  display: flex;
  margin-top: 10px;
`

const Input = styled.input`
  width: 0;
  flex: 1 1 auto;
  padding: 7px 8px;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-right: 12px;

  &::placeholder {
    color: #aaa;
  }
`

const Button = styled.div`
  border: 1px solid #1b577a;
  color: white;
  background-color: #2b75a0;
  border-radius: 3px;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  cursor: pointer;
`
