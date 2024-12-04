import React from "react"
import styled from "styled-components"
import Arrow from "./css/arrow"

const count = 4
const width = 46

const Images = ({ images, page, imageUrl, toggle, reset, left, right }) => (
  <Block
    onMouseMove={toggle}
    onMouseLeave={reset}
  >
    {images.length > count && (
      <Arrow
        onClick={left}
        active={page > 0}
      />
    )}

    <Items>
      <Container page={page}>
        {images.map(image => (
          <Item
            key={image}
            url={`${imageUrl + image}`}
            data-image={`${imageUrl + image}`}
          />
        ))}
      </Container>
    </Items>
    {images.length > count && (
      <Arrow
        rotate="-90"
        active={page !== Math.ceil(images.length / count) - 1}
        onClick={right}
      />
    )}
  </Block>
)

export default Images

const Block = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
  align-items: center;
`

const Items = styled.div`
  width: 100%;
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transition: all 0.5s ease;
  transform: translateX(-${props => count * width * (props.page || 0)}px);
`

const Item = styled.div`
  margin-right: 3px;
  width: 43px;
  height: 43px;
  min-width: 43px;
  background-image: url(${props =>
    props.url || "http://via.placeholder.com/273x200"});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    border: 1px solid #bb1313;
  }
`
