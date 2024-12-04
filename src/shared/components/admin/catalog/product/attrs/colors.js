import React from "react"
import styled from "styled-components"
import { FILTER_COLORS } from "utils/data/colors"
import { Title } from "globalComponents/admin/elements"
const Colors = ({ values, change, toggleAll }) => (
  <Block>
    <Title>
      Цвета
      <Tips>
        Кружок - не выбрано
        <br />
        Квадрат - выбрано
      </Tips>
    </Title>

    <Content>
      <List>
        {Object.keys(FILTER_COLORS).map(ruName => (
          <Color
            selected={values.includes(ruName)}
            key={ruName}
            style={{ backgroundColor: FILTER_COLORS[ruName].hex }}
            onClick={change}
            data-value={ruName}
          >
            <ColorTitle>{ruName}</ColorTitle>
          </Color>
        ))}
      </List>

      <ToggleButton
        data-action-name="select"
        onClick={toggleAll}
      >
        Выбрать все
      </ToggleButton>
      <ToggleButton
        data-action-name="remove"
        onClick={toggleAll}
      >
        Убрать все
      </ToggleButton>
    </Content>
  </Block>
)

export default Colors

const Block = styled.div`
  margin-bottom: 30px;
  display: flex;
`

const Content = styled.div`
  width: 300px;
`

const Tips = styled.div`
  color: #bbb;
  font-size: 12px;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ColorTitle = styled.span`
  display: none;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  white-space: nowrap;
  padding: 3px 6px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  color: #fff;
  z-index: 1000;
`

const Color = styled.span`
  position: relative;
  margin-right: 10px;
  margin-bottom: 8px;
  width: 20px;
  height: 20px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.54);
  cursor: pointer;
  border-radius: ${props => (props.selected ? 0 : "50%")};

  &:hover ${ColorTitle} {
    display: inline-block;
  }
`

const ToggleButton = styled.span`
  display: inline-block;
  margin: 5px 15px 0 0;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #007dd0;
  }
`
