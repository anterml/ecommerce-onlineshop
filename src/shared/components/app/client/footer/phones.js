import React from "react"
import styled from "styled-components"
import { PHONE_NUMBERS } from "utils/data/phone-numbers"

// Обернут в <div> из-за странного бага:
// Если использовать Fragment вместо <div>,
// то чтобы применить nth-of-type к первому элементу
// нужно вместо nth-of-type(1) указать nth-of-type(2)
const PhoneNumbers = () => (
  <div>
    {PHONE_NUMBERS.ELECTRONICS.map(number => (
      <Value key={number}>{number}</Value>
    ))}
    <Time>9:00 — 21:00</Time>
  </div>
)

export default PhoneNumbers

const Item = styled.div`
  &:nth-of-type(1) {
    margin-bottom: 20px;
  }
`

const Title = styled.div`
  color: #979696;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 2px;
`

const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px;
`

const Time = styled.div`
  color: #5d5b5b;
`
