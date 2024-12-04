import React from "react"
import styled, { keyframes } from "styled-components"

const Spinner = props => (
  <Block {...props}>
    <Wrap>
      <Content>Loading...</Content>
    </Wrap>
  </Block>
)

export default Spinner

const transition = keyframes`
  0%   { transform: rotate(0deg);   }
  100% { transform: rotate(360deg); }
`

const Block = styled.div`
  position: relative;
  height: ${props => props.h || "100%"};
  text-align: ${props => props.align || "center"};
  ${props => props.css || ""};
`

const Wrap = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  display: inline-block;
  transform: translateX(-50%);
`

const Content = styled.div`
  font-size: 10px;
  display: inline-block;
  position: relative;
  color: transparent;
  border: 6px solid rgb(179, 179, 179);
  border-left-color: rgb(84, 87, 88);
  transform: translateZ(0);
  animation: ${transition} 1.1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 5em;
    height: 5em;
  }
`
