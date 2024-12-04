import React from "react"
import styled from "styled-components"

const AttrDetails = ({ attrs }) => (
  <Block>
    <Title>Характеристики</Title>
    {attrs.map(({ name, value }) => (
      <Item key={name}>
        <Name>
          <span>{name}</span>
        </Name>
        <span>{value}</span>
      </Item>
    ))}
  </Block>
)

export default AttrDetails

const Block = styled.div`
  margin: 30px 0;
`

const Item = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;
`

const Name = styled.div`
  font-weight: 500;
  position: relative;
  flex: 0 0 250px;
  margin-right: 5px;

  span {
    position: relative;
    display: inline-block;
    padding-right: 5px;
    z-index: 1;
    background-color: #fff;
  }

  &:after {
    border-bottom: 1px dotted #e5e5e5;
    bottom: 5px;
    content: "";
    display: block;
    height: 20px;
    position: absolute;
    width: 100%;
  }
`

const Title = styled.h2`
  margin: 0 0 20px;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  color: #777;
`
