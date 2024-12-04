import React from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"

const ArrowButtons = ({ changeDirection }) => (
  <Block>
    <Arrow
      onClick={changeDirection}
      data-direction="left"
    >
      <Icon name="arrow" />
    </Arrow>
    <Arrow
      onClick={changeDirection}
      data-direction="right"
    >
      <Icon name="arrow" />
    </Arrow>
  </Block>
)

export default ArrowButtons

const Block = styled.div`
  display: flex;
`

const Arrow = styled.span`
  width: 24px;
  height: 24px;
  padding: 5px;
  opacity: 0.5;
  cursor: pointer;

  &[data-direction="left"] {
    margin-right: 5px;
    transform: rotate(90deg);
  }

  &[data-direction="right"] {
    transform: rotate(-90deg);
  }

  &:hover {
    opacity: 1;
  }

  & * {
    pointer-events: none;
  }
`
