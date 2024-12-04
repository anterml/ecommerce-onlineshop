import React from "react"
import styled from "styled-components"
import Spinner from "globalComponents/spinners/base"

const Wrap = styled.div`
  display: inline-block;
  width: 54px;
  height: 54px;
`

const SpinnerBlock = () => (
  <Wrap>
    <Spinner />
  </Wrap>
)

export default SpinnerBlock
