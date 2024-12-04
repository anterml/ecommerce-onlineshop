import React from "react"
import styled from "styled-components"

const Price = ({ actual, old }) => (
  <Block>
    <span>
      <span>{actual}</span>
      <Currency>Р</Currency>
    </span>
    {!!old && <Old>{old} Р</Old>}
  </Block>
)

export default Price

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  color: #333;
  font-size: 18px;
  margin-top: 15px;
  font-weight: 500;
  white-space: nowrap;
`

const Currency = styled.span`
  font-size: 13px;
  margin-left: 3px;
`

const Old = styled.span`
  text-decoration: line-through;
  font-size: 13px;
  font-weight: 300;
  margin-left: 8px;
  color: #b30202;
  white-space: nowrap;
`
