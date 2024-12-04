import React from "react"
import styled from "styled-components"

const Price = ({ current, old }) => (
  <Block>
    <Current>
      <Value>{current}</Value>
      <span>&#8381;</span>
    </Current>
    {!!old && <Old>{old} р</Old>}
  </Block>
)

export default Price

const Block = styled.div`
  position: relative;
  white-space: nowrap;
  @media (max-width: 580px) {
    margin-top: 20px;
  }
`

const Current = styled.span`
  font-size: 27px;
  color: #333;
  margin-right: 15px;
  font-weight: 500;
`

const Value = styled.span`
  margin-right: 4px;
`

const Old = styled.div`
  text-decoration: line-through;
  font-size: 17px;
  color: #999;
  color: #b30202;
  transform: rotate(-10deg);
  position: absolute;
  top: -30px;
  display: inline-block;
`
