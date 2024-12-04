import React from "react"
import styled from "styled-components"
import { Input } from "globalComponents/admin/elements"

const Popup = ({ group, groupNames, change, remove }) => {
  const { name, kind, view, hideFields } = group
  const viewValue = view || (name.indexOf("Цвет") === 0 ? "Цвет" : "Текст")

  return (
    <Block>
      <Item>
        <Title>Название</Title>
        <Wrap>
          <Input
            name="name"
            value={name}
            onChange={change}
          />
        </Wrap>
      </Item>

      <Item>
        <Title>Тип</Title>
        <Select
          value={kind || name}
          onChange={change}
          name="kind"
        >
          {groupNames.map(v => (
            <option
              value={v}
              key={v}
            >
              {v}
            </option>
          ))}
        </Select>
      </Item>

      <Item>
        <Title>Отображать как</Title>
        <Select
          value={viewValue}
          onChange={change}
          name="view"
        >
          <option value="Текст">Текст</option>
          <option value="Цвет">Цвет</option>
          <option value="Картинка">Картинка</option>
        </Select>
      </Item>

      <Item>
        <Title>Видимость полей</Title>
        <Select
          value={!!hideFields || ""}
          onChange={change}
          name="hideFields"
        >
          <option value="">Видимы</option>
          <option value="true">Скрыты</option>
        </Select>
      </Item>

      <RemoveButton onClick={remove}>Удалить</RemoveButton>
    </Block>
  )
}

export default Popup

const Block = styled.div`
  position: absolute;
  background: white;
  z-index: 100;
  white-space: nowrap;
  top: 40px;
  right: 0;
  padding: 20px 30px 20px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.41);
  border-radius: 2px;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    min-width: 170px;
  }
`

const Title = styled.div`
  font-weight: 500;
`

const Wrap = styled.div`
  display: flex;
  margin-bottom: 5px;
`

const Select = styled.select`
  width: 100%;
  padding: 7px 10px;
  margin-bottom: 5px;
`

const RemoveButton = styled.button`
  padding: 7px 10px;
  width: 100%;
  margin-top: 10px;
`
