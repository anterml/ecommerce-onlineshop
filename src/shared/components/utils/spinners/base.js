import styled, { keyframes } from "styled-components"

const transition = keyframes`
  0%   { transform: rotate(0deg);   }
  100% { transform: rotate(360deg); }
`

export default styled.div`
  border: ${props => props.borderWidth || 6}px solid rgb(179, 179, 179);
  border-left-color: rgb(84, 87, 88);
  transform: translateZ(0);
  animation: ${transition} 1.1s infinite linear;

  &,
  &:after {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`
