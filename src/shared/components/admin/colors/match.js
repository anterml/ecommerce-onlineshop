import React from "react"
import styled from "styled-components"

const ROOT_TEXTURE_URL = "https://storage.googleapis.com/yourpath"

const Match = ({ colors }) => (
  <Block>
    {colors
      .filter(color => color.image)
      .map(({ ru, hex, image }) => {
        const style = {
          backgroundImage: `url("${ROOT_TEXTURE_URL + image}")`,
          marginLeft: "10px",
        }

        return (
          <Item key={ru}>
            <Wrap>
              <Color style={{ backgroundColor: hex }} />
              <ColorWrap>
                <Color style={style} />
                <BigColor style={style} />
              </ColorWrap>
            </Wrap>
            <Name>{ru}</Name>
          </Item>
        )
      })}
  </Block>
)

export default Match

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Wrap = styled.div`
  display: flex;
`

const ColorWrap = styled.div`
  position: relative;
`

const Item = styled.div`
  width: 210px;
  margin-bottom: 20px;
`

const BigColor = styled.div`
  width: 250px;
  height: 250px;
  position: absolute;
  display: none;
  top: -260px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 3px;
  z-index: 9999;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.34);
`

const Color = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.19);
  border-radius: 3px;

  &:hover + ${BigColor} {
    display: block;
  }
`

const Name = styled.div`
  color: #555;
`
