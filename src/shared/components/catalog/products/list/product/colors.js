import React from "react"
import styled from "styled-components"

const Colors = ({ colors, restColorCount }) => (
  <Block>
    {colors.map(({ name, backgroundColors }, i) => (
      <Item key={i}>
        <Tooltip>{name}</Tooltip>
        {backgroundColors.map((backgroundColor, k) => (
          <Part
            style={{ backgroundColor }}
            key={k}
          />
        ))}
      </Item>
    ))}

    {restColorCount && <MoreText>ещё {restColorCount}</MoreText>}
  </Block>
)

export default Colors

const Block = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
`

const Part = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`

const Tooltip = styled.div`
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.88);
  box-shadow: 0px 0px 2px 1px rgb(120, 119, 119);
  color: #353434;
  padding: 5px 10px;
  border-radius: 2px;
  display: none;
  font-size: 13px;
  white-space: nowrap;
`

const Item = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-right: 3px;
  min-width: 16px;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #444;
  position: relative;
  &:hover ${Tooltip} {
    display: inline-block;
  }
`

const MoreText = styled.span`
  font-size: 11px;
  color: #aaa;
  line-height: 15px;
  margin-left: 5px;
`
