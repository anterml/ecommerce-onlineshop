import styled from "styled-components"

const Arrow = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  max-width: 15px;
  min-width: 15px;
  background-image: url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 129 129'><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'/></svg>");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 10px auto;
  opacity: 0.25;

  transform: rotate(${props => props.rotate || 90}deg);

  ${props =>
    props.active &&
    `
    cursor: pointer;
    opacity: 1;
  `};
`

export default Arrow
