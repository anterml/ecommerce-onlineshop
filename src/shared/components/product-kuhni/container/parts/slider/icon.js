import React from "react"
import styled from "styled-components"

const Icon = ({ changeDirection, leftActive, rightActive }) => (
  <Container>
    <Block
      onClick={changeDirection}
      data-active={leftActive}
      data-direction="left"
    >
      <Circle
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
      >
        <circle
          cx="12"
          cy="12"
          r="11.5"
        ></circle>
      </Circle>
      <Arrow
        viewBox="0 0 6 10"
        width="100%"
        height="100%"
      >
        <path d="M5.03 4.755L1.456.98a.33.33 0 0 0-.485 0 .36.36 0 0 0 0 .492L4.311 5 .972 8.527a.36.36 0 0 0 0 .492.329.329 0 0 0 .484 0l3.57-3.773h.001a.36.36 0 0 0 .002-.491z"></path>
      </Arrow>
    </Block>
    <Block
      onClick={changeDirection}
      data-active={rightActive}
      data-direction="right"
    >
      <Circle
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
      >
        <circle
          cx="12"
          cy="12"
          r="11.5"
        ></circle>
      </Circle>
      <Arrow
        viewBox="0 0 6 10"
        width="100%"
        height="100%"
      >
        <path d="M5.03 4.755L1.456.98a.33.33 0 0 0-.485 0 .36.36 0 0 0 0 .492L4.311 5 .972 8.527a.36.36 0 0 0 0 .492.329.329 0 0 0 .484 0l3.57-3.773h.001a.36.36 0 0 0 .002-.491z"></path>
      </Arrow>
    </Block>
  </Container>
)

export default Icon

const Container = styled.div`
  display: flex;
`

const Block = styled.div`
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  opacity: 0.7;

  &[data-active="false"] {
    cursor: default;
    opacity: 0.3;
  }

  &[data-active="true"]:hover {
    opacity: 1;
  }

  &:first-child {
    margin-right: 5px;
    transform: rotate(180deg);
  }

  & * {
    pointer-events: none;
  }
`

const Circle = styled.svg`
  z-index: 2;
  fill: none;
  width: 100%;
  height: 100%;
  stroke: #999;
  stroke-width: 1.1px;
`

const Arrow = styled.svg`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 3px;
  margin: auto;
  z-index: 1;
  width: 7px;
  fill: #000;
  stroke: #000;
  stroke-width: 0.25;
  &[data-right] {
    transform: rotate(180deg);
  }
`
