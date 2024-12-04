import React from "react"
import Spinner from "globalComponents/spinners/circle"
import styled from "styled-components"

export default () => (
  <SpinnerWrap>
    <Spinner />
  </SpinnerWrap>
)

const SpinnerWrap = styled.div`
  min-height: 1000px;
  padding-top: 100px;
`
