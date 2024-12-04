import React from "react"
import styled from "styled-components"

const ROOT_TEXTURE_URL = "https://storage.googleapis.com/yourpath"

const All = ({ colors, searchText }) => (
  <Block>
    {colors.map(({ ru, hex, image }) => {
      const style = image
        ? { backgroundImage: `url("${ROOT_TEXTURE_URL + image}")` }
        : { backgroundColor: hex }

      let name = ru
      if (searchText) {
        var beg = ru.toLowerCase().indexOf(searchText)
        name = (
          <div>
            {ru.slice(0, beg)}
            <SelectedText>
              {ru.slice(beg, beg + searchText.length)}
            </SelectedText>
            {ru.slice(beg + searchText.length)}
          </div>
        )
      }

      return (
        <Item key={ru}>
          <Color style={style} />
          <BigColor style={style} />
          <Name>{name}</Name>
        </Item>
      )
    })}
  </Block>
)

export default All

const Block = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding: 20px 20px 220px;
  border: 1px solid transparent;

  &:hover {
    border-color: #ddd;
    background-color: #eee;
  }
`

const BigColor = styled.div`
  width: 250px;
  height: 250px;
  position: absolute;
  display: none;
  bottom: -200px;
  left: -255px;
  border-radius: 3px;
  z-index: 9999;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.34);
`

const Item = styled.div`
  display: flex;
  min-width: 50%;
  max-width: 50%;
  margin-bottom: 10px;
  height: 50px;
  position: relative;

  @media (min-width: 768px) {
    max-width: 25%;
    min-width: 25%;
  }

  &:nth-of-type(4n + 1) ${BigColor} {
    left: 55px;
  }
`

const SelectedText = styled.span`
  font-weight: 600;
  color: rgb(32, 173, 238);
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
  align-self: center;
  padding-right: 5px;
  color: #343434;
  margin-left: 15px;
`
