import React from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"

const Image = ({ imageUrl, image, remove, swap }) => (
  <Block>
    <Top>
      <SwapButton
        data-direction="left"
        data-image={image}
        onClick={swap}
      >
        <Icon name="arrow-2" />
      </SwapButton>
      <Title>{image}</Title>
      <SwapButton
        data-image={image}
        onClick={swap}
      >
        <Icon name="arrow-2" />
      </SwapButton>
    </Top>
    <Picture style={{ backgroundImage: `url('${imageUrl}')` }}>
      <RemoveButton
        onClick={remove}
        data-image={image}
      >
        Удалить
      </RemoveButton>
    </Picture>
  </Block>
)

export default Image

const RemoveButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px 10px;
`

const Block = styled.div`
  flex: 0 0 180px;
  margin: 0 20px 15px 0;
  user-select: none;
  &:hover ${RemoveButton} {
    display: block;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  align-items: center;
`

const Title = styled.span`
  color: #666;
  text-align: center;
`

const SwapButton = styled.div`
  flex: 0 0 15px;
  height: 15px;
  color: #999;
  cursor: pointer;

  &[data-direction="left"] {
    transform: rotate(180deg);
  }

  &:hover {
    color: #333;
  }
`

const Picture = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: 2px solid rgba(34, 34, 34, 0.69);
`
