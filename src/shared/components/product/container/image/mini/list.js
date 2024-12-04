import React from "react"
import styled from "styled-components"

const List = ({ images, imagePath, current, change }) =>
  images.map(image => (
    <Item
      style={{ backgroundImage: `url("${imagePath + image}")` }}
      selected={current === image}
      data-image-url={image}
      onMouseEnter={change}
      key={image}
    />
  ))

export default List

const Item = styled.div`
  min-height: 95px;
  min-width: 94px;
  @media (max-width: 480px) {
    min-height: 89px;
    min-width: 88px;
  }
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 1px;
  margin-right: 10px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  background-origin: content-box;
  cursor: pointer;

  ${props => props.selected && "border-bottom-color: #b30202"};
`
