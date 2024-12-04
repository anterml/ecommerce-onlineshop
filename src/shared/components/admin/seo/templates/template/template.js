import React from "react"
import styled from "styled-components"
import { Button } from "globalComponents/admin/buttons"
import Content from "./content"
import useText from "./use-text"

const Template = ({ selectedId, value, save, remove }) => {
  if (!selectedId)
    return (
      <Block>
        <Text>Выберите шаблон слева в списке</Text>
      </Block>
    )

  if (selectedId && !value)
    return (
      <Block>
        <Text>Шаблон не найден</Text>
      </Block>
    )

  const { name } = value

  const [text, changeText, saveText] = useText(value.text, selectedId, save)
  const changed = text !== value.text

  return (
    <Block>
      <Header>
        <div>
          <Name>{name}</Name>
        </div>
        <div>
          <Button
            onClick={remove}
            data-id={selectedId}
          >
            Удалить
          </Button>
          <Button
            onClick={saveText}
            disabled={!changed}
          >
            Сохранить
          </Button>
        </div>
      </Header>
      <Content
        text={text}
        change={changeText}
        save={save}
      />
    </Block>
  )
}

export default Template

const Block = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 20px;

  button {
    margin-left: 5px;
  }
`

const Name = styled.span`
  font-weight: 500;
  margin-right: 5px;
`

const Text = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 100px;
  font-weight: 300;
  color: #b5b5b5;
`
