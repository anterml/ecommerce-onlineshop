import React from "react"
import styled from "styled-components"

const ApplyButton = ({ apply, css }) => (
  <Block
    onClick={apply}
    css={css}
  >
    <Arrow />
    <Text>Показать</Text>
  </Block>
)

export default ApplyButton

const Block = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  align-items: center;
  cursor: pointer;
  top: ${props => props.css.top + "px"};
  left: ${props => props.css.left + "px"};
`

const Arrow = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  border-right: 16px solid #b30202;
`

const Text = styled.span`
  padding: 8px 10px;
  color: white;
  background-color: #b30202;
  border-radius: 0 3px 3px 0;
`
