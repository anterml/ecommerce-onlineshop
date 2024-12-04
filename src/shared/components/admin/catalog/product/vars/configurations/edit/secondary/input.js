import React from "react"
import styled from "styled-components"

const InputItem = ({ name, value, change, placeholder }) => (
  <Block>
    <Input
      data-name={name}
      placeholder={placeholder}
      onKeyPress={change}
    />
    {value}
  </Block>
)

export default InputItem

const Block = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  margin-right: 5px;
  display: block;
  padding: 5px 10px;
  margin-bottom: 5px;
  font-size: 13px;
`
